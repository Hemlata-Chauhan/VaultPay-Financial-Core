import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Dashboard() {

    const [active, setActive] = useState("dashboard");
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const username = localStorage.getItem("username") || "User";

    useEffect(() => {
        API.get("/invoices").then(res =>
            setInvoices([...res.data].reverse())
        );
    }, []);

    useEffect(() => {
        API.get("/payments").then(res =>
            setPayments(res.data)
        );
    }, []);

    const payInvoice = async (invoiceId) => {
        const res = await API.post(`/payments/checkout/${invoiceId}`);
        window.location.href = res.data.url;
    };

    const createInvoice = async (e) => {
        e.preventDefault();

        const res = await API.post("/invoices", {
            amount,
            description
        });

        setInvoices(prev => [res.data, ...prev]);
        setAmount("");
        setDescription("");
        setActive("dashboard");
    };

    const totalInvoices = invoices.length;
    const pendingInvoices = invoices.filter(i => i.status === "Pending");
    const paidInvoices = invoices.filter(i => i.status === "Paid");

    const successPayments = payments.filter(p => p.status === "Success");
    const failedPayments = payments.filter(p => p.status === "Failed");

    return (
        <div className="dashboard-container">

            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="logo">VaultPay</div>

                <ul>
                    <li onClick={() => setActive("dashboard")}>Dashboard</li>
                    <li onClick={() => setActive("create")}>Create Invoice</li>
                    <li onClick={() => setActive("invoices")}>Invoices</li>
                    <li onClick={() => setActive("payments")}>Payments</li>

                    <li onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}>
                        Logout
                    </li>
                </ul>
            </aside>

            {/* MAIN */}
            <main className="main-content">

                <div className="topbar">
                    <h2>Welcome, {username} 👋</h2>
                </div>

                <div className="content">

        
                    {active === "dashboard" && (
                        <div>
                            <div className="section-title-wrapper">
                                <span className="section-badge">
                                    Invoice Center
                                </span>

                                <h2 className="section-title">
                                    Latest Invoices
                                </h2>

                                <p className="section-subtitle">
                                    Manage, track and monitor your recent invoices
                                </p>
                            </div>

                            <div className="invoice-grid">
                                {invoices.slice(0, 10).map((inv, index) => (
                                    <div key={inv._id} className="small-card">

                                        <h4>{index + 1}. {inv.description}</h4>

                                        <p className="amount">₹ {inv.amount}</p>

                                        <span className={`status ${inv.status.toLowerCase()}`}>
                                            {inv.status}
                                        </span>

                                        {inv.status === "Pending" ? (
                                            <button onClick={() => payInvoice(inv._id)}>
                                                Pay
                                            </button>
                                        ) : (
                                            <button disabled>
                                                Paid
                                            </button>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                
                    {active === "create" && (
                        <div>
                            <div className="section-title-wrapper">
                                <span className="section-badge">
                                    ✨ Invoice Creator
                                </span>

                                <h2 className="section-title">
                                    Create Invoice
                                </h2>

                                <p className="section-subtitle">
                                    Generate and send invoices securely
                                </p>
                            </div>

                            <form className="card" onSubmit={createInvoice}>
                                <input
                                    className="input"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <input
                                    className="input"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                <button type="submit">Create Invoice</button>
                            </form>
                        </div>
                    )}

                    
                    {active === "invoices" && (
                        <div>
                            <div className="section-title-wrapper">
                                <span className="section-badge">
                                    📋 Invoice Records
                                </span>

                                <h2 className="section-title">
                                    All Invoices
                                </h2>

                                <p className="section-subtitle">
                                    View, manage and track every invoice
                                </p>
                            </div>

                            <div className="summary-grid">

                                <div className="summary-card">
                                    <h4>Total</h4>
                                    <h2>{totalInvoices}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Pending</h4>
                                    <h2>{pendingInvoices.length}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Paid</h4>
                                    <h2>{paidInvoices.length}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Revenue</h4>
                                    <h2>
                                        ₹ {paidInvoices.reduce(
                                            (sum, i) => sum + Number(i.amount || 0),
                                            0
                                        )}
                                    </h2>
                                </div>

                            </div>

                            

                            {invoices.map((inv, index) => (
                                <div key={inv._id} className="card">

                                    <h3>{index + 1}. {inv.description}</h3>
                                    <p>₹ {inv.amount}</p>

                                    <p>
                                        Status:
                                        <b style={{
                                            color: inv.status === "Paid" ? "#16a34a" : "#f59e0b",
                                            marginLeft: "6px"
                                        }}>
                                            {inv.status}
                                        </b>
                                    </p>

                                    {inv.status === "Pending" ? (
                                        <button onClick={() => payInvoice(inv._id)}>
                                            Pay Now
                                        </button>
                                    ) : (
                                        <button disabled>
                                            Paid
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    
                    {active === "payments" && (
                        <div>
                            <div className="section-title-wrapper">
                                <span className="section-badge">
                                    💳 Transaction Center
                                </span>

                                <h2 className="section-title">
                                    Payment History
                                </h2>

                                <p className="section-subtitle">
                                    Monitor all successful and failed payments
                                </p>
                            </div>

                            <div className="summary-grid">

                                <div className="summary-card">
                                    <h4>Total</h4>
                                    <h2>{payments.length}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Success</h4>
                                    <h2>{successPayments.length}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Failed</h4>
                                    <h2>{failedPayments.length}</h2>
                                </div>

                                <div className="summary-card">
                                    <h4>Revenue</h4>
                                    <h2>
                                        ₹ {successPayments.reduce(
                                            (sum, p) => sum + Number(p.amount || 0),
                                            0
                                        )}
                                    </h2>
                                </div>

                            </div>

                            {payments.length === 0 ? (
                                <p>No payments found.</p>
                            ) : (
                                payments.map((p, index) => (
                                    <div key={p._id} className="card">

                                        <h3>{index + 1}. ₹ {p.amount}</h3>

                                        <p>
                                            Status:
                                            <b style={{
                                                color: p.status === "Success" ? "green" : "red",
                                                marginLeft: "6px"
                                            }}>
                                                {p.status}
                                            </b>
                                        </p>

                                        <p>Invoice ID: {p.invoice}</p>

                                        <p>
                                            Date: {new Date(p.createdAt).toLocaleString()}
                                        </p>

                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>

            </main>
        </div>
    );
}
import { Link }
    from "react-router-dom";

export default function InvoiceCard({
    invoice
}) {

    const payInvoice = async () => {

        const response =
            await fetch(
                `http://localhost:5000/api/payments/checkout/${invoice._id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

        const data =
            await response.json();

        window.location.href =
            data.url;
    };

    return (
        <div className="card">

            <h3>
                {invoice.description}
            </h3>

            <p>
                Amount:
                ${invoice.amount}
            </p>

            <p>
                Status:
                {invoice.status}
            </p>

            <button
                onClick={payInvoice}
            >
                Pay Now
            </button>

            <Link
                to={`/invoice/${invoice._id}`}
            >
                View
            </Link>

        </div>
    );
}
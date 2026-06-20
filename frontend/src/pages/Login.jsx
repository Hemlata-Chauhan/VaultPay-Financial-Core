import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState({
        show: false,
        type: "",
        message: ""
    });
    useEffect(() => {

        if (toast.show) {

            const timer =
                setTimeout(() => {

                    setToast(prev => ({
                        ...prev,
                        show: false
                    }));

                }, 4000);

            return () =>
                clearTimeout(timer);
        }

    }, [toast.show]);
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "username",
                res.data.user.name
            );

            setToast({
                show: true,
                type: "success",
                message: "Login successful."
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (err) {

            setToast({
                show: true,
                type: "error",
                message:
                    err.response?.data?.message ||
                    "Login failed"
            });
        }
    };

    return (
        <div className="auth-wrapper">
            <Toast
                show={toast.show}
                type={toast.type}
                message={toast.message}
            />

            <div className="auth-wrapper">
        

            <div className="auth-left">
                <h1>VaultPay 🚀</h1>
                <p>Join the future of invoicing</p>
                <span>Simple • Powerful • Secure</span>
            </div>

            <div className="auth-right">

                <form className="auth-card-modern" onSubmit={handleLogin}>

                    <h2>Welcome back 👋</h2>
                    <p>Login to your account</p>

                    <input
                        className="auth-input"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-btn">
                        Sign In
                    </button>

                    <p className="switch">
                        Don’t have an account?
                        <span onClick={() => navigate("/register")}> Create one</span>
                    </p>

                </form>

            </div>
            </div>

        </div>
    );
}
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(
                "SUCCESS:",
                res.data
            );

            navigate("/");

        } catch (err) {

            console.log(
                "ERROR STATUS:",
                err.response?.status
            );

            console.log(
                "ERROR DATA:",
                err.response?.data
            );

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    };
    return (
        <div className="auth-wrapper">

            <div className="auth-left">
                <h1>VaultPay 🚀</h1>
                <p>Join the future of invoicing</p>
                <span>Simple • Powerful • Secure</span>
            </div>

            <div className="auth-right">

                <form className="auth-card-modern" onSubmit={handleRegister}>

                    <h2>Create account ✨</h2>
                    <p>Start your journey</p>

                    <input
                        className="auth-input"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        Create Account
                    </button>

                    <p className="switch">
                        Already have an account?
                        <span onClick={() => navigate("/")}> Login</span>
                    </p>

                </form>

            </div>

        </div>
    );
}
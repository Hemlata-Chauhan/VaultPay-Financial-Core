import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 5000);

        return () => clearTimeout(timer);

    }, []);

    return (
        <div className="auth-container">

            <div className="failed-card">

                <div className="failed-icon">
                    ✕
                </div>

                <h1>
                    Payment Failed ❌
                </h1>

                <p>
                    Your transaction was not completed.
                </p>

                <p className="redirect-text">
                    Redirecting to dashboard in 5 seconds...
                </p>

            </div>

        </div>
    );
}
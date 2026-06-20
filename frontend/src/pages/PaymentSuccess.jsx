import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.setItem(
            "toast",
            JSON.stringify({
                type: "success",
                message:
                    "Payment completed successfully."
            })
        );

        const timer =
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);

        return () =>
            clearTimeout(timer);

    }, []);

    return (
        <div className="auth-container">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>
                    Payment Successful 🎉
                </h1>

                <p>
                    Your payment has been completed successfully.
                </p>

                <p className="redirect-text">
                    Redirecting to dashboard in 5 seconds...
                </p>

            </div>

        </div>
    );
}
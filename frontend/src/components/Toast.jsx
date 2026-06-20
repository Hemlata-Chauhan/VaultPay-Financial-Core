import React from "react";

export default function Toast({
    show,
    type,
    message
}) {
    if (!show) return null;

    return (
        <div className={`toast ${type}`}>
            <div className="toast-icon">
                {type === "success" && "✓"}
                {type === "error" && "✕"}
                {type === "warning" && "!"}
            </div>

            <div className="toast-content">
                <h4>
                    {type === "success" && "Success"}
                    {type === "error" && "Error"}
                    {type === "warning" && "Warning"}
                </h4>

                <p>{message}</p>
            </div>
        </div>
    );
}
import {
    useContext
} from "react";

import {
    AuthContext
} from "../context/AuthContext";

export default function Navbar() {

    const { logout } =
        useContext(AuthContext);

    return (
        <nav className="nav">

            <h2>VaultPay</h2>

            <button
                onClick={logout}
            >
                Logout
            </button>

        </nav>
    );
}
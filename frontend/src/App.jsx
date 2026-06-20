import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔥 IMPORTANT ROUTES */}
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentFailed />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
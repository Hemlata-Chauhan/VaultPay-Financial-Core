const express =
    require("express");

const cors =
    require("cors");

const app = express();

app.use(cors());

app.use(
    "/api/webhooks",
    express.raw({
        type: "application/json"
    }),
    require("./routes/webhookRoutes")
);

app.use(express.json());

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/invoices",
    require("./routes/invoiceRoutes")
);

app.use(
    "/api/payments",
    require("./routes/paymentRoutes")
);

module.exports = app;
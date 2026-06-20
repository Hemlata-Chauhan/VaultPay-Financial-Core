const express =
    require("express");

const router =
    express.Router();

const {
    handleStripeWebhook
} = require(
    "../controllers/webhookController"
);

router.post("/stripe", (req, res, next) => {
    console.log("🔥 ROUTE REACHED");
    next();
}, handleStripeWebhook);

module.exports = router;
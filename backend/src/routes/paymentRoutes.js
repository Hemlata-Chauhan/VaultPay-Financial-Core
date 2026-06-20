const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");

const {
    createCheckoutSession
} = require("../controllers/paymentController");

const Payment = require("../models/Payment");

router.post(
    "/checkout/:id",
    authenticate,
    createCheckoutSession
);

router.get("/", authenticate, async (req, res) => {
    try {

        const payments = await Payment.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(payments);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
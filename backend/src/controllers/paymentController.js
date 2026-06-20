const Invoice = require("../models/Invoice");
const stripe = require("../services/stripeService");

exports.createCheckoutSession =
    async (req, res, next) => {
        try {
            const invoice =
                await Invoice.findById(
                    req.params.id
                );

            if (!invoice) {
                return res.status(404).json({
                    message: "Invoice not found"
                });
            }

            if (
                invoice.owner.toString() !==
                req.user.id
            ) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            const session =
                await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],

                    line_items: [
                        {
                            price_data: {
                                currency: "usd",

                                product_data: {
                                    name:
                                        invoice.description
                                },

                                unit_amount:
                                    invoice.amount * 100
                            },

                            quantity: 1
                        }
                    ],

                    mode: "payment",

                    success_url:
                        `${process.env.CLIENT_URL}/success`,

                    cancel_url:
                        `${process.env.CLIENT_URL}/cancel`,

                    metadata: {
                        invoiceId:
                            invoice._id.toString()
                    }
                });

            invoice.stripeSessionId =
                session.id;

            await invoice.save();

            res.json({
                sessionId: session.id,
                url: session.url
            });
        } catch (error) {
            next(error);
        }
    };
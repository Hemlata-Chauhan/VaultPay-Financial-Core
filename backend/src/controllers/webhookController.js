const stripe =
    require("../services/stripeService");

const Invoice =
    require("../models/Invoice");

const User =
    require("../models/User");

const Payment = require("../models/Payment");

const generateReceipt =
    require(
        "../services/pdfService"
    );

const sendReceiptEmail =
    require(
        "../services/emailService"
    );

exports.handleStripeWebhook =
    async (req, res) => {
       

        let event;

        try {
            const signature =
                req.headers["stripe-signature"];

            event =
                stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    process.env
                        .STRIPE_WEBHOOK_SECRET
                );
        } catch (err) {
            console.log(
                "Webhook Signature Failed"
            );

            return res.status(400).send(
                `Webhook Error: ${err.message}`
            );
        }

        switch (event.type) {
            case "checkout.session.completed": {

                const session = event.data.object;

                const invoiceId =
                    session.metadata.invoiceId;

                const invoice =
                    await Invoice.findById(invoiceId);

                if (!invoice) {
                    console.log(
                        "Invoice not found in webhook"
                    );
                    break;
                }

                // Mark invoice paid
                invoice.status = "Paid";
                invoice.paymentIntentId =
                    session.payment_intent;

                await invoice.save();

                console.log(
                    "Invoice marked Paid:",
                    invoice._id
                );

                // Save payment record
                await Payment.create({
                    user: invoice.owner,
                    invoice: invoice._id,
                    amount: invoice.amount,
                    status: "Success",
                    stripePaymentIntentId:
                        session.payment_intent
                });

                console.log(
                    "Payment saved successfully"
                );

                // Find user
                const user =
                    await User.findById(
                        invoice.owner
                    );

                if (!user) {
                    console.log(
                        "User not found"
                    );
                    break;
                }

                // Generate PDF
                const pdfPath =
                    await generateReceipt(
                        invoice,
                        user
                    );

                console.log(
                    "PDF Generated:",
                    pdfPath
                );

                // Send Email
                await sendReceiptEmail(
                    user.email,
                    user.name,
                    pdfPath
                );

                console.log(
                    "Receipt email sent"
                );

                break;
            }
        }

        res.json({
            received: true
        });
    };
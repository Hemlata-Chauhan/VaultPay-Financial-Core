const nodemailer =
    require("nodemailer");

const transporter =
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:
                process.env.EMAIL_USER,
            pass:
                process.env.EMAIL_PASS
        }
    });

const sendReceiptEmail =
    async (
        email,
        name,
        pdfPath
    ) => {

        await transporter.sendMail({
            from:
                process.env.EMAIL_USER,
            to: email,
            subject:
                "Payment Receipt",

            html: `
                <h2>Hello ${name}</h2>
                <p>Your payment was successful.</p>
                <p>Receipt attached.</p>
            `,

            attachments: [
                {
                    filename:
                        "receipt.pdf",
                    path: pdfPath
                }
            ]
        });
    };

module.exports =
    sendReceiptEmail;
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateReceipt = (invoice, user) => {
    return new Promise((resolve, reject) => {

        const receiptsDir = path.join(
            __dirname,
            "../../uploads/receipts"
        );

        if (!fs.existsSync(receiptsDir)) {
            fs.mkdirSync(receiptsDir, {
                recursive: true
            });
        }

        const filePath = path.join(
            receiptsDir,
            `receipt-${invoice._id}.pdf`
        );

        const doc = new PDFDocument({
            size: "A4",
            margin: 40
        });

        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);


        const logoPath = path.join(
            __dirname,
            "../../assets/nexus-logo.png"
        );

        if (fs.existsSync(logoPath)) {
            doc.image(
                logoPath,
                50,
                40,
                {
                    width: 60
                }
            );
        }

        doc
            .fontSize(26)
            .font("Helvetica-Bold")
            .fillColor("#4f46e5")
            .text(
                "NEXUS CORPORATE",
                130,
                50
            );

        doc
            .fontSize(11)
            .fillColor("#6b7280")
            .font("Helvetica")
            .text(
                "Enterprise Invoice & Payment Platform",
                130,
                80
            );

        doc.moveTo(50, 120)
            .lineTo(545, 120)
            .stroke("#e5e7eb");

        doc.y = 150;

        doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "PAYMENT RECEIPT",
                0,
                doc.y,
                {
                    align: "center",
                    width: doc.page.width
                }
            );


        const stampX = 340;
        const stampY = 220;

        doc.save();

        doc.rotate(-15, {
            origin: [450, 250]
        });

        doc
            .lineWidth(3)
            .strokeColor("#22c55e")
            .roundedRect(
                stampX,
                stampY,
                170,
                50,
                8
            )
            .stroke();

        doc
            .fillColor("#22c55e")
            .fontSize(22)
            .font("Helvetica-Bold")
            .text(
                "NEXUS PAID",
                stampX,
                stampY + 14,
                {
                    width: 170,
                    align: "center"
                }
            );

        doc.restore();

        const leftX = 50;
        const topY = 190;

        doc
            .fontSize(16)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "Receipt Details",
                leftX,
                topY
            );

        doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor("#374151")
            .text(
                `Receipt No: RCPT-${invoice._id
                    .toString()
                    .slice(-8)
                    .toUpperCase()}`,
                leftX,
                topY + 30
            );

        doc.text(
            `Invoice ID: ${invoice._id}`,
            leftX,
            topY + 50
        );

        doc.text(
            `Date: ${new Date().toLocaleString()}`,
            leftX,
            topY + 70
        );

        doc
            .fontSize(16)
            .font("Helvetica-Bold")
            .fillColor("#111827")
            .text(
                "Customer Information",
                leftX,
                topY + 120
            );

        doc
            .fontSize(12)
            .font("Helvetica")
            .fillColor("#374151")
            .text(
                `Customer Name: ${user.name}`,
                leftX,
                topY + 150
            );

        doc.text(
            `Customer Email: ${user.email}`,
            leftX,
            topY + 170
        );
        doc.y = 390;


        const boxY = doc.y;

        doc
            .roundedRect(
                50,
                boxY,
                495,
                120,
                10
            )
            .fillAndStroke(
                "#f8fafc",
                "#e5e7eb"
            );

        doc
            .fillColor("#111827")
            .fontSize(15)
            .font("Helvetica-Bold")
            .text(
                "Payment Summary",
                70,
                boxY + 15
            );

        doc
            .fontSize(12)
            .font("Helvetica")
            .fillColor("#374151")
            .text(
                `Description: ${invoice.description}`,
                70,
                boxY + 45
            );

        doc.text(
            `Status: ${invoice.status}`,
            70,
            boxY + 70
        );

        doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .fillColor("#16a34a")
            .text(
                `$${invoice.amount}`,
                400,
                boxY + 50
            );

        doc.y = boxY + 150;


        const thankYouY = doc.y + 20;

        doc
            .fontSize(20)
            .font("Helvetica-Bold")
            .fillColor("#4f46e5")
            .text(
                "Thank You!",
                50,
                thankYouY,
                {
                    width: 495,
                    align: "center"
                }
            );

        doc
            .fontSize(11)
            .font("Helvetica")
            .fillColor("#6b7280")
            .text(
                "Your payment has been received successfully.",
                50,
                thankYouY + 35,
                {
                    width: 495,
                    align: "center"
                }
            );

        doc.text(
            "This receipt serves as proof of payment.",
            50,
            thankYouY + 52,
            {
                width: 495,
                align: "center"
            }
        );


        const footerY = 730;

        doc
            .moveTo(50, footerY)
            .lineTo(545, footerY)
            .stroke("#e5e7eb");


        doc
            .fontSize(10)
            .font("Helvetica")
            .fillColor("#9ca3af")
            .text(
                "Generated by Nexus Corporate Billing System",
                50,
                footerY + 15,
                {
                    width: 495,
                    align: "center"
                }
            );

        doc.text(
            "© 2026 Nexus Corporate. All Rights Reserved.",
            50,
            footerY + 30,
            {
                width: 495,
                align: "center"
            }
        );

        doc.end();

        stream.on(
            "finish",
            () => resolve(filePath)
        );

        stream.on(
            "error",
            reject
        );
    });
};

module.exports = generateReceipt;
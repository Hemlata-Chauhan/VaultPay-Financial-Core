const Invoice = require(
    "../models/Invoice"
);

const authorizeInvoiceOwner =
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
                    message:
                        "Forbidden - Access denied"
                });
            }

            req.invoice = invoice;

            next();
        } catch (error) {
            next(error);
        }
    };

module.exports =
    authorizeInvoiceOwner;
const Invoice = require(
    "../models/Invoice"
);

exports.createInvoice =
    async (
        req,
        res,
        next
    ) => {
        try {
            const {
                amount,
                description
            } = req.body;

            const invoice =
                await Invoice.create({
                    owner: req.user.id,
                    amount,
                    description
                });

            res.status(201).json(
                invoice
            );
        } catch (error) {
            next(error);
        }
    };

exports.getInvoice =
    async (
        req,
        res
    ) => {
        res.json(req.invoice);
    };

exports.getMyInvoices =
    async (
        req,
        res,
        next
    ) => {
        try {
            const invoices =
                await Invoice.find({
                    owner:
                        req.user.id
                });

            res.json(invoices);
        } catch (error) {
            next(error);
        }
    };
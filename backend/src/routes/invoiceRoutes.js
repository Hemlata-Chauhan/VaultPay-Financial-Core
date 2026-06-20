const express =
    require("express");

const router =
    express.Router();

const authenticate =
    require(
        "../middleware/authenticate"
    );

const authorizeInvoiceOwner =
    require(
        "../middleware/authorizeInvoiceOwner"
    );

const {
    createInvoice,
    getInvoice,
    getMyInvoices
} = require(
    "../controllers/invoiceController"
);

router.post(
    "/",
    authenticate,
    createInvoice
);

router.get(
    "/",
    authenticate,
    getMyInvoices
);

router.get(
    "/:id",
    authenticate,
    authorizeInvoiceOwner,
    getInvoice
);

module.exports = router;
import {
    useParams
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import API
    from "../api/axios";

export default function InvoiceDetails() {

    const { id } =
        useParams();

    const [invoice,
        setInvoice] =
        useState(null);

    useEffect(() => {

        API.get(
            `/invoices/${id}`
        ).then((res) => {

            setInvoice(
                res.data
            );
        });

    }, [id]);

    if (!invoice)
        return <p>Loading</p>;

    return (
        <div>

            <h2>
                {invoice.description}
            </h2>

            <p>
                Amount:
                {invoice.amount}
            </p>

            <p>
                Status:
                {invoice.status}
            </p>

        </div>
    );
}
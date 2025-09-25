// server/routes/payment.js
import express from "express";
import snap from "../config/midtrans.js";
import Transaction from "../models/transactionModel.js";
// (pastikan kamu punya model transaksi, nanti kita buat)

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { orderId, amount, customer } = req.body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount,
            },
            customer_details: {
                first_name: customer.name,
                email: customer.email,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        // transaction.redirect_url, transaction.token, dll

        // Simpan transaksi awal ke DB dengan status pending
        const newTx = await Transaction.create({
            orderId,
            amount,
            status: "pending",
            customerEmail: customer.email,
        });

        return res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            transaction: newTx,
        });
    } catch (err) {
        console.error("Error create transaction:", err);
        return res.status(500).json({ message: "Gagal buat transaksi" });
    }
});

router.post("/notification", express.json(), async (req, res) => {
    try {
        const notification = req.body;

        const { order_id, transaction_status, fraud_status } = notification;

        // Cari transaksi berdasarkan order_id
        const tx = await Transaction.findOne({ orderId: order_id });
        if (!tx) {
            return res
                .status(404)
                .json({ message: "Transaksi tidak ditemukan" });
        }

        if (transaction_status === "settlement" && fraud_status === "accept") {
            tx.status = "success";
        } else if (transaction_status === "pending") {
            tx.status = "pending";
        } else {
            tx.status = "failed";
        }

        await tx.save();

        // harus balas 200 ke Midtrans
        return res.status(200).json({ message: "OK" });
    } catch (err) {
        console.error("Error notification:", err);
        return res.status(500).json({ message: "Error" });
    }
});

export default router;

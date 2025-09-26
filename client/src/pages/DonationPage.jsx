// client/src/pages/DonationPage.jsx atau file serupa
import React, { useState } from "react";
import axios from "axios";

function DonationPage() {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleDonate = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:5000/api/payment/create`,
        {
          orderId: `order-${Date.now()}`,
          amount: amount,
          customer: {
            name,
            email,
          },
        }
      );
      const { redirect_url } = resp.data;
      // Arahkan user ke halaman pembayaran Midtrans
      window.location.href = redirect_url;
    } catch (err) {
      console.error("Error saat membuat transaksi:", err);
    }
  };

  return (
    <div>
      <h2>Donasi</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Jumlah donasi"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleDonate}>Donasi Sekarang</button>
    </div>
  );
}

export default DonationPage;

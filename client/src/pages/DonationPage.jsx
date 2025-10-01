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
        <div className="mt-10">
            <h2>Donasi</h2>
            <form className="p-5 border-2 border-blue-400 rounded shadow-lg">
                <p class="font-semibold">Nominal Donasi</p>
                <div class="grid grid-cols-2 gap-4">
                    <label class="cursor-pointer">
                        <input
                            type="radio"
                            name="donasi"
                            value="30000"
                            class="peer hidden"
                        />
                        <div class="rounded-full border border-purple-600 px-6 py-3 text-center font-semibold text-purple-700 peer-checked:bg-purple-600 peer-checked:text-white">
                            Rp 30.000
                        </div>
                    </label>

                    <label class="cursor-pointer">
                        <input
                            type="radio"
                            name="donasi"
                            value="50000"
                            class="peer hidden"
                        />
                        <div class="rounded-full border border-purple-600 px-6 py-3 text-center font-semibold text-purple-700 peer-checked:bg-purple-600 peer-checked:text-white">
                            Rp 50.000
                        </div>
                    </label>

                    <label class="cursor-pointer">
                        <input
                            type="radio"
                            name="donasi"
                            value="100000"
                            class="peer hidden"
                        />
                        <div class="rounded-full border border-purple-600 px-6 py-3 text-center font-semibold text-purple-700 peer-checked:bg-purple-600 peer-checked:text-white">
                            Rp 100.000
                        </div>
                    </label>

                    <label class="cursor-pointer">
                        <input
                            type="radio"
                            name="donasi"
                            value="lainnya"
                            class="peer hidden"
                        />
                        <div class="rounded-full border border-purple-600 px-6 py-3 text-center font-semibold text-purple-700 peer-checked:bg-purple-600 peer-checked:text-white">
                            Lainnya
                        </div>
                    </label>
                </div>

                {/* <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Jumlah donasi"
                /> */}
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
            </form>
        </div>
    );
}

export default DonationPage;

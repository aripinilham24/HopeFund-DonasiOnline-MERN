import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackButton } from "../components/Buttoon";

function DonationPage() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/campaigns/title/${id}`
                );
                setCampaign(res.data.data.title);
            } catch (err) {
                console.log("Error fetching campaign:", err);
            }
        };
        fetchCampaign();
    }, [id]);

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
        <div className="mt-10 flex flex-col items-center gap-5">
            <BackButton className="absolute top-20 left-5" />
            <h2 className="font-bold text-lg">{campaign}</h2>
            <form className="w-200 p-5 border-2 border-blue-400 rounded shadow-lg flex flex-col ">
                <div class="mb-10">
                    <p class="font-semibold">Nominal Donasi</p>
                    <div class="grid grid-cols-2 gap-4">
                        <label class="cursor-pointer">
                            <input
                                type="radio"
                                name="donasi"
                                value="30000"
                                class="peer hidden"
                            />
                            <div class="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
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
                            <div class="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
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
                            <div class="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
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
                            <div class="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
                                Lainnya
                            </div>
                        </label>

                        
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-gray-700" htmlFor="amount">Isi nominal donasi</label>
                        <input type="number" name="amount" id="amount" min={1000} className="rounded p-1 border border-gray-700" />
                    </div>
                </div>

                <div className="mb-10 flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Dukungan dan Doa untuk campaign</label>
                    <textarea name="message" id="message" className="p-2 border border-gray-800 rounded h-50" placeholder="tulis dukunganmu di sini" />
                </div>

                <div className="mb-10 flex flex-col gap-2">
                    <p className="font-semibold">Masukan Identitas Kamu di Sini</p>

                    <label className="text-gray-700" htmlFor="name">Nama <span className="text-red-600">*</span></label>
                    <input className="rounded h-10 border border-blue-400 p-1" type="text" name="name" id="name" rquired />

                    <label className="text-gray-700" htmlFor="email">Email <span className="text-red-600">*</span></label>
                    <input className="rounded h-10 border border-blue-400 p-1" type="email" name="name" id="name" rquired />

                    <label className="text-gray-700" htmlFor="telp">No. Telpon <span className="text-red-600">*</span></label>
                    <input className="rounded h-10 border border-blue-400 p-1" type="number" name="telp" id="telp" min={0}/>
                </div>
                <div>
                <input type="checkbox" name="anonymous" id="anonymous" defaultChecked className="checkbox checkbox-info me-2" />
                <label htmlFor="anonymous">Sembunyikan Nama</label>
                </div>
                <button className="btn btn-outline btn-info mt-8" onClick={handleDonate}>Donasi Sekarang</button>
            </form>
        </div>
    );
}

export default DonationPage;

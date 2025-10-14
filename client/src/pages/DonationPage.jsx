import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackButton } from "../components/Buttoon";

function DonationPage() {
    const { id } = useParams();
    const [clientKey, setClientKey] = useState("");
    const [campaign, setCampaign] = useState(null);
    const [amount, setAmount] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telp, setTelp] = useState("");
    const [anonymous, setAnonymous] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClientKey = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/payment/config"
                );
                setClientKey(res.data.clientKey);
            } catch (err) {
                console.log("Error fetching client key:", err);
            }
        };
        fetchClientKey();
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", clientKey);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [clientKey]);

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

    const handleDonate = async (e) => {
        e.preventDefault();

        if (amount <= 0) {
            alert("Masukkan nominal donasi terlebih dahulu!");
            return;
        }

        if (!name || !email || !telp) {
            alert("Harap isi semua data identitas!");
            return;
        }
        setLoading(true);
        try {
            const resp = await axios.post(
                `http://localhost:5000/api/payment/create`,
                {
                    donateId: `donate-${Date.now()}`,
                    amount: Number(amount),
                    message,
                    campaignId: id,
                    customer: {
                        userId: "68d41b229e5ff9b8773c912b",
                        name,
                        email,
                        telp,
                        anonymous,
                    },
                }
            );
            const { token } = resp.data;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    alert("payment success!");
                    console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    alert("wating your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    alert("payment failed!");
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (err) {
            console.error("Error saat membuat transaksi:", err);
            alert("Terjadi kesalahan saat membuat transaksi!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 flex flex-col items-center gap-5">
            <BackButton className="absolute top-20 left-5" />
            <h2 className="font-bold text-lg">{campaign}</h2>
            <form
                onSubmit={handleDonate}
                className="w-200 p-5 border-2 border-blue-400 rounded shadow-lg flex flex-col "
            >
                <div className="mb-10">
                    <p className="font-semibold">Nominal Donasi</p>
                    <div className="grid grid-cols-2 gap-4">
                        {[30000, 50000, 100000].map((val, i) => (
                            <label className="cursor-pointer" key={i}>
                                <input
                                    type="radio"
                                    name="donasi"
                                    value={val}
                                    className="peer hidden"
                                    checked={Number(amount) === val}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        setShowInput(false);
                                    }}
                                />
                                <div className="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
                                    Rp {val.toLocaleString()}
                                </div>
                            </label>
                        ))}
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="donasi"
                                value="lainnya"
                                className="peer hidden"
                                onChange={() => setShowInput(true)}
                            />
                            <div className="rounded-full border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 peer-checked:bg-blue-600 peer-checked:text-white">
                                Lainnya
                            </div>
                        </label>
                    </div>
                    <div
                        className={`flex flex-col mt-5 ${
                            showInput ? "" : "hidden"
                        }`}
                    >
                        <label className="text-gray-700" htmlFor="amount">
                            Isi nominal donasi
                        </label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            min={1000}
                            value={amount}
                            className="rounded p-1 border border-gray-700"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-10 flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">
                        Dukungan dan Doa untuk campaign
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        className="p-2 border border-gray-800 rounded h-50"
                        placeholder="tulis dukunganmu di sini"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="mb-10 flex flex-col gap-2">
                    <p className="font-semibold">
                        Masukan Identitas Kamu di Sini
                    </p>

                    <label className="text-gray-700" htmlFor="name">
                        Nama <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="rounded h-10 border border-blue-400 p-1"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label className="text-gray-700" htmlFor="email">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="rounded h-10 border border-blue-400 p-1"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="text-gray-700" htmlFor="telp">
                        No. Telpon <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="rounded h-10 border border-blue-400 p-1"
                        type="number"
                        name="telp"
                        id="telp"
                        min={0}
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="anonymous"
                        id="anonymous"
                        checked={anonymous}
                        className="checkbox checkbox-info me-2"
                        onChange={() => setAnonymous(!anonymous)}
                    />
                    <label htmlFor="anonymous">Sembunyikan Nama</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline btn-info mt-8"
                    disabled={loading}
                >
                    {loading ? "Memproses..." : "Donasi Sekarang"}
                </button>
            </form>
        </div>
    );
}

export default DonationPage;

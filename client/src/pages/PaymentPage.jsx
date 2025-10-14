import { useEffect, useState } from "react";
import axios from "axios";

function PaymentPage() {
    const [clientKey, setClientKey] = useState("");
    const [snapToken, setSnapToken] = useState(null);

    // ✅ Load Midtrans Snap script once
    useEffect(() => {
        const fetchClientKey = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/config/midtrans");
                setClientKey(response.data.clientKey);
            } catch (e) {
                console.error("Error fetching client key:", e);
            }
        }

        fetchClientKey();
        if (!clientKey) return(console.log("Client key not set yet"));

        const midtransScriptUrl = "https://app.stg.midtrans.com/snap/snap.js"; // sandbox
        const myMidtransClientKey = "SET_YOUR_CLIENT_KEY_HERE"; // client key dari Midtrans Dashboard

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    // ✅ Contoh fungsi untuk mendapatkan Snap Token dari backend
    const createTransaction = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/transactions/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: 10000 }),
                }
            );

            const data = await response.json();
            setSnapToken(data.token);
        } catch (error) {
            console.error("Error getting token:", error);
        }
    };

    // ✅ Jalankan embed saat token sudah didapat
    useEffect(() => {
        if (snapToken && window.snap) {
            window.snap.embed(snapToken, {
                embedId: "snap-container",
                onSuccess: function (result) {
                    alert("Payment success!");
                    console.log(result);
                },
                onPending: function (result) {
                    alert("Waiting for your payment!");
                    console.log(result);
                },
                onError: function (result) {
                    alert("Payment failed!");
                    console.log(result);
                },
                onClose: function () {
                    alert("You closed the payment window.");
                },
            });
        }
    }, [snapToken]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
                Snap Embedded Payment
            </h2>

            <button
                onClick={createTransaction}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Pay Now
            </button>

            {/* Container untuk Snap embed */}
            <div id="snap-container" className="mt-4 w-full min-h-[600px]" />
        </div>
    );
}

export default PaymentPage;

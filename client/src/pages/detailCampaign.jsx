import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const DetailCampaign = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [donor, setDonor] = useState(null);
    useEffect(() => {
        const getCampaign = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/campaigns/${id}`
                );
                setCampaign(res.data.campaign);
                setDonor(res.data.transactions);
            } catch (err) {
                console.log("error get campaign:", err);
            }
        };
        getCampaign();
    }, [id]);

    return (
        <>
            <section className="text-dark mt-10 grid grid-cols-1 justify-center">
                {campaign ? (
                    <div className="campaign-detail mx-auto">
                        <div className="m-5 p-5">
                            <img
                                className="h-100 rounded shadow-lg mx-auto"
                                src={`http://localhost:5000/uploads/image/campaign/${campaign.image}`}
                                alt={campaign.title}
                            />
                        </div>
                        <div className="campaign-info shadow-lg p-5 flex flex-col gap-2 m-5">
                            <span className="text-blue-400">
                                ✅ Terverifikasi
                            </span>
                            <h2 className="text-xl font-bold">
                                {campaign.title}
                            </h2>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">🙍 {donor ? donor.length : 0} Donatur</span>
                                <a href="#" className="btn">
                                    Share
                                </a>
                            </div>
                            <div className="nominal-info text-blue-400 flex justify-between">
                                <span>Terkumpul: Rp {campaign.amountRaised}</span>
                                <span>Kurang: Rp {campaign.targetAmount - campaign.amountRaised}</span>
                            </div>
                        </div>
                        <div className="m-5 shadow-lg p-5">
                            <h3 className="font-bold">Description</h3>
                            <p>{campaign.description}</p>
                        </div>
                        <div className="m-5 shadow-lg p-5">
                            <h3 className="font-bold">Donatur</h3>
                            <div className="flex flex-col gap-2">
                                {donor && donor.length > 0 ? (
                                    donor.map((donor, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-5 items-center border p-5 rounded text-grey-600"
                                        >
                                            <img
                                                src={`http://localhost:5000/uploads/image/profile/${donor.user.avatar}`}
                                                alt={donor.user.name}
                                                className="h-15 rounded-full"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold">{donor.user.name}</span>
                                                <span>Rp {donor.amount}</span>
                                                <p>{donor.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Belum ada donatur</p>
                                )}
                            </div>
                        </div>
                        <a href={`/donation/${id}`} className="btn btn-outline btn-primary w-full">
                            Donate Now
                        </a>
                    </div>
                ) : (
                    <p>Campaign not found.</p>
                )}
            </section>
        </>
    );
};

export default DetailCampaign;

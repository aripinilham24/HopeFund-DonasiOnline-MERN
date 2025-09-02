import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const DetailCampaign = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    useEffect(() => {
        const getCampaign = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/campaigns/${id}`
                );
                setCampaign(res.data.data);
            } catch (err) {
                console.log("error get campaign:", err);
            }
        };
        getCampaign();
    }, [id]);

    return (
        <>
            <section className="text-dark mt-10">
                <h1 className="text-2xl">Detail Campaign</h1>
                {campaign ? (
                    <div className="campaign-detail mt-10">
                        <img
                            className="h-100 rounded shadow-lg mx-auto"
                            src={`http://localhost:5000/uploads/image/campaign/${campaign.image}`}
                            alt={campaign.title}
                        />
                        <h2 className="text-xl mt-5">{campaign.title}</h2>
                        <p>{campaign.description}</p>
                    </div>
                ) : (
                    <p>Campaign not found.</p>
                )}
            </section>
        </>
    );
};

export default DetailCampaign;

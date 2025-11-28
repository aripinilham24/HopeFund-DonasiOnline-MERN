import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { categoriesNav } from "../assets";
import CampaignCard from "../components/CampaignCard";
import { Title } from "react-head";

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/campaigns?category=${category}`
        );
        setCampaigns(res.data.data);
      } catch (err) {
        console.log("error get campaigns:", err);
      }
    };
    getCampaigns();
  }, [category]);

  return (
    <>
      <Title>HopeFund | Situs donasi online</Title>
      <section className="min-h-screen text-gray-950 p-10">
        <Slider />

        <div className="categories-bar flex justify-evenly items-center flex-wrap gap-3 p-5 bg-linear-65 from-blue-500 to-blue-300 rounded shadow-lg mt-15">
          {categoriesNav.map((category, index) => (
            <a
              onClick={() => setCategory(category.category)}
              className="card flex flex-col justify-center items-center"
              key={index}
            >
              <img
                className="h-7 lg:h-10"
                src={category.icon}
                alt={category.name}
              />
              <h1 className="text-center text-white">{category.name}</h1>
            </a>
          ))}
        </div>

        <div className="urgent-campaigns bg-linear-65 from-blue-500 to-blue-300 rounded-lg shadow-lg mt-15 p-5">
          <div className="title font-bold text-2xl flex items-center gap-2">
            <img
              className="h-10"
              src="https://img.icons8.com/?size=100&id=12226&format=png&color=000000"
              alt="priority"
            />
            <h1 className="text-white">Daftar Campaign</h1>
          </div>

          <div className="campaigns-list mt-10 flex flex-wrap gap-2 justify-center">
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => (
                <CampaignCard
                  key={index}
                  id={campaign._id}
                  title={campaign.title}
                  desc={campaign.shortDescription}
                  img={`http://localhost:5000/uploads/image/campaign/${campaign.image}`}
                />
              ))
            ) : (
              <div className="text-white text-2xl text-center">
                Campaign tidak ditemukan.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

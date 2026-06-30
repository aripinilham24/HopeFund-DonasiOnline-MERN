import { useEffect, useState } from "react";
import Slider from "../../components/Slider.jsx";
import { categoriesNav } from "../../assets/index.js";
import CampaignCard from "../../components/CampaignCard.jsx";
import { Title } from "react-head";
import { api, url } from "../../api/axios.js";
import { CampaignSkeleton } from "@/components/skeletons/CampaignSkeleton";
import { Empty } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        setLoading(true);
        const res = await api.get(`campaigns?category=${category}`);
        setCampaigns(res.data.data);
      } catch (err) {
        console.log("error get campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    getCampaigns();
  }, [category]);

  return (
    <>
      <Title>HopeFund | Situs donasi online</Title>
      <section className="min-h-screen pb-10">
        <Slider />

        <div className="flex justify-evenly items-center flex-wrap gap-3 p-5 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-lg mt-5">
          <button
            onClick={() => setCategory("")}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded transition-colors",
              category === "" ? "bg-white/20" : "hover:bg-white/10"
            )}
          >
            <svg className="h-5 lg:h-10 w-auto" viewBox="0 0 24 24" fill="white">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span className="hidden lg:block text-sm lg:text-base text-center text-white">Semua</span>
          </button>
          {categoriesNav.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setCategory(cat.category)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded transition-colors",
                category === cat.category ? "bg-white/20" : "hover:bg-white/10"
              )}
            >
              <img className="h-5 lg:h-10" src={cat.icon} alt={cat.name} />
              <span className="hidden lg:block text-sm lg:text-base text-center text-white">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg shadow-lg mt-5 p-5">
          <div className="font-bold text-2xl flex items-center gap-2 mb-5">
            <img
              className="h-10"
              src="https://img.icons8.com/?size=100&id=12226&format=png&color=000000"
              alt="priority"
            />
            <h1 className="text-white text-2xl">Daftar Campaign</h1>
          </div>

          {loading ? (
            <div className="flex flex-wrap gap-5 justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <CampaignSkeleton key={i} />
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <div className="flex flex-wrap gap-5 justify-center">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  id={campaign._id}
                  title={campaign.title}
                  desc={campaign.shortDescription}
                  img={`${url}/uploads/image/campaign/${campaign.image}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {category && (
                <p className="text-white/80 text-sm text-center">
                  Kategori <span className="font-semibold text-white">&ldquo;{category}&rdquo;</span> belum memiliki campaign.
                  Silakan pilih kategori lain.
                </p>
              )}
              <Empty
                title="Campaign tidak ditemukan"
                description={category ? `Belum ada campaign untuk kategori "${category}".` : "Belum ada campaign yang tersedia saat ini."}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;

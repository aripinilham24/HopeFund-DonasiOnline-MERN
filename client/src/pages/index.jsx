import Carousel from "../components/Carousel";
import { categoriesNav, urgentCampaignList } from "../assets";
import CampaignCard from "../components/CampaignCard";
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
        <main className="min-h-screen text-gray-950 p-10">
            <Carousel />

            <div className="categories-bar flex justify-evenly items-center flex-wrap gap-3 p-5 bg-blue-300 rounded shadow-lg mt-15">
                {categoriesNav.map((category, index) => (
                    <a
                        href={category.link}
                        className="card flex flex-col justify-center items-center"
                        key={index}
                    >
                        <img
                            className="h-7 lg:h-10"
                            src={category.icon}
                            alt={category.name}
                        />
                        <h1 className="text-center">{category.name}</h1>
                    </a>
                ))}
            </div>

            <div className="urgent-campaigns bg-blue-300 rounded shadow-lg mt-15 p-5">
                <div className="title font-bold text-2xl flex items-center gap-2">
                    <img
                    className="h-10"
                        src="https://img.icons8.com/?size=100&id=12226&format=png&color=000000"
                        alt="priority"
                    />
                    <h1>Urgent</h1>
                </div>

                <div className="campaigns-list mt-10 flex flex-wrap gap-5 justify-center">
                    {urgentCampaignList.map((campaign, index) => (
                        <CampaignCard
                            key={index}
                            id={campaign.id}
                            title={campaign.title}
                            desc={campaign.desc}
                            img={campaign.img}
                        />
                    ))}
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
};

export default HomePage;

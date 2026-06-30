import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackButton } from "../../components/Buttoon.jsx";
import { Title } from "react-head";
import { api, url } from "../../api/axios.js";
import { rupiahFormatter } from "../../utils/utils.js";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";

const DetailCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  useEffect(() => {
    const getCampaign = async () => {
      try {
        setLoading(true);
        const res = await api.get(`campaigns/${id}`);
        setCampaign(res.data.campaign);
        setDonor(res.data.transactions);
      } catch (err) {
        console.log("error get campaign:", err);
      } finally {
        setLoading(false);
      }
    };
    getCampaign();
    setVisibleCount(5);
  }, [id]);

  if (loading) {
    return (
      <section className="mt-10 grid grid-cols-1 justify-center text-sm lg:text-base">
        <BackButton className="absolute top-18 left-1 lg:top-20 lg:left-5" />
        <div className="mx-auto w-full max-w-2xl p-5 space-y-4">
          <Skeleton className="h-50 lg:h-100 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </section>
    );
  }

  return (
    <>
      <Title>{`${campaign ? `HopeFund | ${campaign.title}` : "Loading..."}`}</Title>
      <section className="text-foreground mt-10 grid grid-cols-1 justify-center text-sm lg:text-base">
        <BackButton className="absolute top-18 left-1 lg:top-20 lg:left-5" />

        {campaign ? (
          <div className="campaign-detail mx-auto">
            <div className="m-5 p-5">
              <img
                className="h-50 lg:h-100 rounded shadow-lg mx-auto object-cover"
                src={`${url}/uploads/image/campaign/${campaign.image}`}
                alt={campaign.title}
              />
            </div>
            <div className="shadow-lg p-5 flex flex-col gap-2 m-5">
              <span className="text-blue-400">
                ✅ Terverifikasi
              </span>
              <h2 className="text-xl font-bold">
                {campaign.title}
              </h2>
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  🙍 {donor ? donor.length : 0} Donatur
                </span>
              </div>
              <div className="nominal-info text-blue-400 flex justify-between">
                <span>
                  Terkumpul: {rupiahFormatter(campaign.amountRaised)}
                </span>
                <span>
                  Kurang: {rupiahFormatter((campaign?.targetAmount ?? 0) - (campaign?.amountRaised ?? 0))}
                </span>
              </div>
            </div>
            <div className="m-5 shadow-lg p-5">
              <h3 className="font-bold">Description</h3>
              <p>{campaign.description}</p>
            </div>
            <div className="p-5">
              <a href={`/donation/${id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  Donasi Sekarang
                </Button>
              </a>
            </div>
            <div className="m-5 shadow-lg p-5">
              <h3 className="font-bold">Donatur</h3>
              <div className="flex flex-col gap-2">
                {donor && donor.length > 0 ? (
                  <>
                    {donor.slice(0, visibleCount).map((donor, i) => {
                      let name = "";

                      if (
                        typeof donor.anonymous !==
                        "undefined"
                      ) {
                        name = donor.anonymous
                          ? "Anonim"
                          : donor.donorName || "Anonim";
                      } else if (
                        donor.user &&
                        donor.user.name
                      ) {
                        name = donor.user.name;
                      }

                      const avatar =
                        donor.user && donor.user.avatar
                          ? `${url}/uploads/image/profile/${donor.user.avatar}`
                          : `${url}/uploads/image/profile/user.jpg`;

                      return (
                        <div
                          key={i}
                          className="flex gap-5 items-center border p-2 lg:p-5 rounded text-muted-foreground"
                        >
                          <img
                            src={avatar}
                            alt={name}
                            className="h-10 lg:h-15 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold">
                              {name}
                            </span>
                            <span>
                              {rupiahFormatter(donor.amount)}
                            </span>
                            <p>{donor.message}</p>
                          </div>
                        </div>
                      );
                    })}
                    {visibleCount < donor.length && (
                      <Button
                        variant="outline"
                        className="mt-3 w-full"
                        onClick={() => setVisibleCount((prev) => prev + 5)}
                      >
                        Lihat lebih banyak
                      </Button>
                    )}
                  </>
                ) : (
                  <p>Belum ada donatur</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Empty className="mt-20" title="Campaign tidak ditemukan" description="Campaign yang Anda cari tidak tersedia." />
        )}
      </section>
    </>
  );
};

export default DetailCampaign;

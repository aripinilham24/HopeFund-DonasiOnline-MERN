import { Title } from "react-head";
import { api, url } from "../../api/axios";
import { useState, useEffect } from "react";
import { useUserStore } from "../../store";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { Empty } from "@/components/ui/empty";
import { CampaignForm } from "@/components/CampaignForm";

const CreateDonation = () => {
  const [preview, setPreview] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const { user } = useUserStore();
  const [campaigns, setCampaigns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const login = Boolean(user?.id);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Hapus Campaign",
      text: "apakah kamu yakin ingin menghapus campaign ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`campaigns/${id}`);
          Swal.fire({ icon: "success", title: "Berhasil", text: "Campaign berhasil dihapus." });
          setRefresh(!refresh);
        } catch {
          Swal.fire({ icon: "error", title: "Error", text: "Terjadi kesalahan saat menghapus campaign." });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const formData = new FormData(e.target);
    formData.append("creatorId", user.id);

    try {
      const res = await api.post("/campaigns/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: res.data.success ? "success" : "error",
        title: res.data.success ? "Berhasil" : "Gagal",
        text: res.data.data.message,
      });
      e.target.reset();
      setPreview(null);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Terjadi kesalahan saat membuat campaign.",
      });
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchCampaigns = async () => {
      try {
        setTableLoading(true);
        const res = await api.get(`campaigns/creator/${user.id}`);
        setCampaigns(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTableLoading(false);
      }
    };
    fetchCampaigns();
  }, [user.id, refresh]);

  return (
    <>
      <Title>Buat Campaign</Title>

      {login ? (
        <div className="mt-25 lg:mt-10">
          <Card className="p-5 mb-10">
            <h1 className="text-center text-xl font-semibold mb-10">Campaign Anda</h1>
            {tableLoading ? (
              <TableSkeleton />
            ) : campaigns.length === 0 ? (
              <Empty title="Belum ada campaign" description="Buat campaign pertama Anda di form di bawah." />
            ) : (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-card">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Gambar</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Judul</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Deskripsi</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Detail</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {campaigns.map((campaign, index) => (
                      <tr key={campaign._id} className={`hover:bg-accent transition-colors ${index % 2 === 0 ? "bg-card" : "bg-muted/50"}`}>
                        <td className="px-6 py-4">
                          <img src={`${url}/uploads/image/campaign/${campaign.image}`} alt="gambar_donasi" className="h-16 w-24 object-cover rounded-md shadow-sm border border-border" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-foreground line-clamp-2">{campaign.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">{campaign.shortDescription}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground line-clamp-3 max-w-md">{campaign.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 items-center justify-center">
                            <Link to={`/detailcampaign/${campaign._id}`}><Button variant="default" size="sm">Lihat</Button></Link>
                            <Link to={`/updateCampaign/${campaign._id}`}><Button variant="secondary" size="sm">Edit</Button></Link>
                            <Button variant="destructive" size="sm" onClick={(e) => handleDelete(campaign._id, e)}>Hapus</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <CampaignForm
            title="Buat Campaign Donasi"
            submitText="Buat Campaign"
            onSubmit={handleSubmit}
            preview={preview}
            onImageChange={handleImage}
            isSubmitting={submiting}
            imageRequired={true}
          />
        </div>
      ) : (
        <div className="mt-25 lg:mt-10 flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Silakan login terlebih dahulu untuk membuat campaign.
          </h2>
          <Link to="/login"><Button className="p-5 text-xl">Login</Button></Link>
        </div>
      )}
    </>
  );
};

export default CreateDonation;

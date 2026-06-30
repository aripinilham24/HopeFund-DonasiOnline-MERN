import { Title } from "react-head";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api, url } from "../../api/axios";
import Swal from "sweetalert2";
import { useUserStore } from "../../store";
import { Skeleton } from "@/components/ui/skeleton";
import { CampaignForm } from "@/components/CampaignForm";

const UpdateCampaign = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const { user } = useUserStore();
  const [campaign, setCampaign] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Konfirmasi Update",
      text: "Apakah Anda yakin ingin mengupdate campaign ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) submit(e);
    });
  };

  const submit = async (e) => {
    setSubmiting(true);

    const formData = new FormData(e.target);
    formData.append("creatorId", user.id);

    try {
      const res = await api.put(`campaigns/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: res.data.success ? "success" : "error",
        title: res.data.success ? "Berhasil" : "Gagal",
        text: res.data.data.message,
      });
      e.target.reset();
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Terjadi kesalahan saat update campaign.",
      });
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchCampaign = async () => {
      try {
        setPageLoading(true);
        const res = await api.get(`campaigns/${id}`);
        const data = res.data.campaign;
        setCampaign(data);
        const date = new Date(data.deadline);
        const formattedDate = date.toISOString().split("T")[0];
        setDeadline(formattedDate);
        setPreview(`${url}/uploads/image/campaign/${data.image}`);
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchCampaign();
  }, [id, user.id, refresh]);

  if (pageLoading) {
    return (
      <div className="mt-10 max-w-2xl mx-auto space-y-6 p-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <>
      <Title>Update Campaign</Title>
      <div className="mt-10 max-w-2xl mx-auto">
        <CampaignForm
          title="Update Campaign"
          submitText="Update Campaign"
          onSubmit={handleSubmit}
          preview={preview}
          onImageChange={handleImage}
          isSubmitting={submiting}
          imageRequired={false}
          defaultValues={{
            title: campaign?.title,
            shortDescription: campaign?.shortDescription,
            description: campaign?.description,
            deadline,
            targetAmount: campaign?.targetAmount,
            category: campaign?.category,
          }}
        />
      </div>
    </>
  );
};

export default UpdateCampaign;

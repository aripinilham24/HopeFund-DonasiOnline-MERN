import { Title } from "react-head";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api, url } from "../api/axios";
import Swal from "sweetalert2";
import { useUserStore } from "../store";

const UpdateCampaign = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const { user } = useUserStore();
  const [campaign, setCampaign] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [refresh, setRefresh] = useState(false);

  const login = Boolean(user?.id);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
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
      if (result.isConfirmed) {
        submit(e);
      }
    });
  };

  const submit = async (e) => {
    setSubmiting(true);

    const formData = new FormData();
    formData.append("title", e.target["title-campaign"].value);
    formData.append("description", e.target["deskripsi-campaign"].value);
    formData.append("details", e.target["detail-campaign"].value);
    formData.append("deadline", e.target.deadline.value);
    formData.append("targetAmount", e.target["target-dana"].value);
    formData.append("category", e.target.category.value);
    formData.append("image", e.target["image-campaign"].files[0]);
    formData.append("creatorId", user.id);

    try {
      const res = await api.put(`campaigns/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const icon = res.data.success ? "success" : "error";
      const title = res.data.success ? "Berhasil" : "Gagal";
      const text = res.data.data.message;

      Swal.fire({
        icon: icon,
        title: title,
        text: text,
      });
      e.target.reset();

      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat update campaign.",
      });
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    if (!login) return;
    const fetchCampaign = async () => {
      try {
        const res = await api.get(`campaigns/${id}`);
        const data = res.data.campaign;
        setCampaign(data);
        const date = new Date(data.deadline);
        const formattedDate = date.toISOString().split("T")[0];
        setDeadline(formattedDate);
        setPreview(`${url}/uploads/image/campaign/${data.image}`);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaign();
  }, [id, login, refresh]);
  return (
    <>
      <Title>Update Campaign</Title>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 sm:p-8"
        >
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
            Update Campaign
          </h1>

          {/* Judul Campaign */}
          <div className="mb-6">
            <label
              htmlFor="title-campaign"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Judul Campaign
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              type="text"
              name="title-campaign"
              id="title-campaign"
              placeholder="Contoh: Bantu Anak Yatim untuk Sekolah"
              required
              defaultValue={campaign?.title}
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-6">
            <label
              htmlFor="deskripsi-campaign"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deskripsi Singkat
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              type="text"
              name="deskripsi-campaign"
              id="deskripsi-campaign"
              placeholder="Ringkasan campaign dalam satu kalimat"
              required
              defaultValue={campaign?.shortDescription}
            />
          </div>

          {/* Detail Campaign */}
          <div className="mb-6">
            <label
              htmlFor="detail-campaign"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Detail Campaign
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-[120px] resize-y"
              name="detail-campaign"
              id="detail-campaign"
              required
              defaultValue={campaign?.description}
            />
          </div>

          {/* Batas Waktu dan Target Dana - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Batas Waktu
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                type="date"
                name="deadline"
                id="deadline"
                required
                defaultValue={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="target-dana"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Target Dana (Rp)
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                type="number"
                name="target-dana"
                id="target-dana"
                placeholder="5000000"
                min="0"
                required
                defaultValue={campaign?.targetAmount}
              />
            </div>
          </div>

          {/* Foto Campaign */}
          <div className="mb-6">
            <label
              htmlFor="image-campaign"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Foto Campaign
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              type="file"
              name="image-campaign"
              id="image-campaign"
              accept="image/*"
              onChange={handleImage}
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-w-md h-64 object-cover rounded-lg shadow-md mx-auto"
                />
              </div>
            )}
          </div>

          {/* Kategori Campaign */}
          <div className="mb-8">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kategori Campaign
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
              name="category"
              id="category"
              value={campaign?.category}
              required
              onChange={(e) =>
                setCampaign((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="kesehatan">Kesehatan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="hewan">Hewan</option>
              <option value="darurat">Darurat</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submiting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {submiting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            ) : (
              "Update Campaign"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCampaign;

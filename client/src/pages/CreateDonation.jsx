import { Title } from "react-head";
import { api, url } from "../api/axios";
import { useState, useEffect } from "react";
import { useUserStore } from "../store";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CreateDonation = () => {
  const [preview, setPreview] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const { user } = useUserStore();
  const [campaigns, setCampaigns] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const login = Boolean(user?.id);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
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
          const res = await api.delete(`campaigns/${id}`);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Campaign berhasil dihapus.",
          });
          setRefresh(!refresh);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Terjadi kesalahan saat menghapus campaign.",
          });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await api.post("/campaigns/create", formData, {
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
      setPreview(null);
      setRefresh(!refresh);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat membuat campaign.",
      });
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    if (!login) return;
    const fetchCampaigns = async () => {
      try {
        const res = await api.get(`campaigns/creator/${user.id}`);
        setCampaigns(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCampaigns();
  }, [user.id, refresh]);
  return (
    <>
      <Title>Buat Campaign</Title>

      {login ? (
        <div className={`mt-25 lg:mt-10 ${login ? `block` : `hidden`}`}>
          <div className="bg-white mt-10 shadow-lg p-5">
            <h1 className="text-center text-xl font-semibold mb-10">
              Campaign Anda
            </h1>
            {campaigns.length === 0 && <p>Anda belum membuat campaign.</p>}
            {campaigns.length > 0 && (
              <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Gambar
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Judul
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Deskripsi
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Detail
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {campaigns.map((campaign, index) => {
                      return (
                        <tr
                          key={campaign._id}
                          className={`hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-start">
                              <img
                                src={`${url}/uploads/image/campaign/${campaign.image}`}
                                alt="gambar_donasi"
                                className="h-16 w-24 object-cover rounded-md shadow-sm border border-gray-200"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {campaign.title}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                              {campaign.shortDescription}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 line-clamp-3 max-w-md">
                              {campaign.description}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 items-center justify-center">
                              <Link
                                to={`/detailcampaign/${campaign._id}`}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                              >
                                Lihat
                              </Link>
                              <Link
                                to={`/updateCampaign/${campaign._id}`}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors shadow-sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={(e) => handleDelete(campaign._id, e)}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 sm:p-8"
          >
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
              Buat Campaign Donasi
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
                defaultValue="Tulis detail lengkap campaign di sini..."
                required
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
                required
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
                defaultValue=""
                required
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
                "Buat Campaign"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div
          className={`mt-25 lg:mt-10 flex flex-col items-center justify-center absolute inset-0 ${
            login ? `hidden` : `block`
          }`}
        >
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
            Silakan login terlebih dahulu untuk membuat campaign.
          </h2>
          <Link className="btn btn-primary p-5 text-xl" to="/login">
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateDonation;

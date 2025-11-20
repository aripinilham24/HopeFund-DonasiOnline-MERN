import { Title } from "react-head";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";

const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("email"); // email, otp, newPassword
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Kirim email untuk reset password
  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email tidak lengkap",
        text: "Harap masukkan email Anda.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      Swal.fire({
        icon: "success",
        title: "Email terkirim",
        text: "Kode OTP telah dikirim ke email Anda.",
      });
      setStep("otp");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Email tidak ditemukan.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Step 2: Verifikasi OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      Swal.fire({
        icon: "warning",
        title: "OTP tidak lengkap",
        text: "Harap masukkan kode OTP.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      Swal.fire({
        icon: "success",
        title: "OTP valid",
        text: "Silakan masukkan password baru.",
      });
      setStep("newPassword");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "OTP tidak valid.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password tidak lengkap",
        text: "Harap isi password baru dan konfirmasi.",
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Minimal 6 karakter.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password tidak cocok",
        text: "Password dan konfirmasi harus sama.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Password berhasil diubah. Silakan login.",
      });
      // Redirect ke login
      window.location.href = "/login";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Title>Lupa Password</Title>
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded shadow-lg p-8 w-full max-w-md bg-gray-50">
          <h1 className="text-center font-bold text-2xl mb-6">Forgot Password</h1>

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleSendEmail}>
              <div className="mb-4">
                <div className="p-3 flex gap-2 border rounded border-gray-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500">
                  <i className="bi bi-envelope-fill"></i>
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-gradient border-none bg-gradient-hover transition-all duration-300 w-full"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Kode OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Kode OTP (dikirim ke {email})
                </label>
                <div className="p-3 flex gap-2 border rounded">
                  <i className="bi bi-key-fill"></i>
                  <input
                    type="text"
                    placeholder="Masukkan kode OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 rounded p-3 text-white cursor-pointer hover:bg-blue-400 disabled:opacity-50"
              >
                {isSubmitting ? "Verifikasi..." : "Verifikasi OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-3 text-blue-500 underline"
              >
                Kembali
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "newPassword" && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password Baru
                </label>
                <div className="p-3 flex gap-2 border rounded">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Konfirmasi Password
                </label>
                <div className="p-3 flex gap-2 border rounded">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 rounded p-3 text-white cursor-pointer hover:bg-blue-400 disabled:opacity-50"
              >
                {isSubmitting ? "Mengubah..." : "Ubah Password"}
              </button>

              <button
                type="button"
                onClick={() => setStep("otp")}
                className="w-full mt-3 text-blue-500 underline"
              >
                Kembali
              </button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPw;
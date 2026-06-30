import { Title } from "react-head";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../api/axios";
import { showAlert } from "./alert.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Key, Lock } from "lucide-react";

const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      await api.post("/auth/verify-otp", { email, otp });
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
        <Card className="p-8 w-full max-w-md">
          <h1 className="text-center font-bold text-2xl mb-6">Forgot Password</h1>

          {step === "email" && (
            <form>
              <div className="mb-4">
                <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => showAlert()}
                className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500 text-white"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Kode OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Kode OTP (dikirim ke {email})
                </label>
                <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <Key className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    type="text"
                    placeholder="Masukkan kode OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="border-none shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Verifikasi..." : "Verifikasi OTP"}
              </Button>

              <Button
                type="button"
                variant="link"
                onClick={() => setStep("email")}
                className="w-full mt-3"
              >
                Kembali
              </Button>
            </form>
          )}

          {step === "newPassword" && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password Baru
                </label>
                <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="border-none shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Konfirmasi Password
                </label>
                <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    type="password"
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-none shadow-none focus-visible:ring-0 p-0"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Mengubah..." : "Ubah Password"}
              </Button>

              <Button
                type="button"
                variant="link"
                onClick={() => setStep("otp")}
                className="w-full mt-3"
              >
                Kembali
              </Button>
            </form>
          )}

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Kembali ke Login
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ForgotPw;

import { icons } from "../../assets/index.js";
import { useState } from "react";
import { Title } from "react-head";
import Swal from "sweetalert2";
import { api } from "../../api/axios.js";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store.jsx";
import { showAlert } from "./alert.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Key } from "lucide-react";

const Login = () => {
  const googleicon = icons.find((icon) => icon.name === "google");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Data tidak lengkap",
        text: "Harap isi username dan password.",
      });
      setSubmitting(false);
      return;
    }

    if (username.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Username terlalu pendek",
        text: "Minimal 3 karakter.",
      });
      setSubmitting(false);
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Minimal 6 karakter.",
      });
      setSubmitting(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      if (!res.data?.accessToken) {
        throw new Error("token tidak ditemukan di response.");
      } else {
        useUserStore.getState().setUser({
          refreshToken: res.data.refreshToken,
          accessToken: res.data.accessToken,
          user: res.data.user,
        });
      }

      if (res.data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan server.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Title>HopeFund | Login</Title>
      <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        <Card className="p-6 w-full max-w-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h1 className="text-center font-bold text-xl">LOGIN</h1>

            <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                name="username"
                required
                placeholder="username"
                className="border-none shadow-none focus-visible:ring-0 p-0"
              />
            </div>

            <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                required
                placeholder="password"
                className="border-none shadow-none focus-visible:ring-0 p-0"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500 text-white"
            >
              {isSubmitting ? "Logging in ..." : "Login"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => showAlert()}
            >
              <img className="h-5" src={googleicon.link} alt={googleicon.name} />
              Login with Google
            </Button>

            <div className="flex justify-between text-sm">
              <Link to="/register" className="text-primary hover:underline">Sign Up</Link>
              <Link to="/forgot-pw" className="text-primary hover:underline">Forgot Password</Link>
            </div>
          </form>
        </Card>
        <div className="w-xs lg:w-lg flex flex-col items-center justify-center">
          <h1 className="text-center text-primary text-3xl lg:text-5xl font-bold mb-4">
            HopeFund
          </h1>
          <p className="text-base lg:text-xl text-muted-foreground">
            Mari jadi bagian dari gerakan kebaikan. Login atau daftar sekarang
            untuk mulai berdonasi dengan mudah, cepat, dan transparan.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

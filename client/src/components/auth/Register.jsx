import { Title } from "react-head";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../api/axios";
import { icons } from "../../assets/index.js";
import { useUserStore } from "../../store.jsx";
import { showAlert } from "./alert.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Mail, Key } from "lucide-react";

const Register = () => {
  const googleicon = icons.find((icon) => icon.name === "google");
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser } = useUserStore();

  const handlesignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!username || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Data tidak lengkap",
        text: "Harap isi username, email, dan password.",
      });
      return;
    }
    if (username.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Username terlalu pendek",
        text: "Minimal 3 karakter.",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Minimal 6 karakter.",
      });
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      if (!res.data?.accessToken) {
        throw new Error("token tidak ditemukan di response.");
      } else {
        setUser({
          refreshToken: res.data.refreshToken,
          accessToken: res.data.accessToken,
          user: {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            role: res.data.user.role,
            avatar: res.data.user.avatar,
          },
        });

        window.location.href = "/";
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Title>Sign Up</Title>
      <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        <Card className="p-6 w-full max-w-sm">
          <form onSubmit={handlesignUp} className="flex flex-col gap-5">
            <h1 className="text-center font-bold text-2xl">Sign Up</h1>

            <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                name="username"
                placeholder="username"
                required
                className="border-none shadow-none focus-visible:ring-0 p-0"
              />
            </div>

            <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="email"
                required
                className="border-none shadow-none focus-visible:ring-0 p-0"
              />
            </div>

            <div className="flex items-center gap-2 border border-input rounded-md px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                name="password"
                placeholder="password"
                required
                className="border-none shadow-none focus-visible:ring-0 p-0"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500 text-white"
            >
              {isSubmitting ? "Loading ..." : "Register"}
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

            <Link to="/login" className="text-center text-sm text-primary hover:underline">
              have account
            </Link>
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

export default Register;

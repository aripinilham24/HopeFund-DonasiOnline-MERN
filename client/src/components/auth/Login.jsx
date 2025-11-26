import { icons } from "../../assets/index.js";
import { useState } from "react";
import { Title } from "react-head";
import Swal from "sweetalert2";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store.jsx";

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

      if(res.data.user.role === "admin"){
        window.location.href = "/admin/dashboard";
      }
      else {
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
        <div className="flex items-center justify-center bg-gray-50">
          <form
            onSubmit={handleLogin}
            className="rounded flex flex-col gap-5 p-5 shadow-lg"
          >
            <h1 className="text-center font-bold text-xl">LOGIN</h1>

            <label
              htmlFor="username"
              className="flex border border-gray-400 p-3 rounded gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500"
            >
              <i className="bi bi-person-fill"></i>
              <input
                type="text"
                name="username"
                required
                placeholder="username"
                className="lg:w-xs outline-none"
              />
            </label>
            <label
              htmlFor="password"
              className="flex border border-gray-400 p-3 rounded gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500"
            >
              <i className="bi bi-key-fill"></i>
              <input
                type="password"
                name="password"
                required
                placeholder="password"
                className="lg:w-xs outline-none"
              />
            </label>
            <button
              type="submit"
              className="btn bg-gradient border-none bg-gradient-hover transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in ..." : "Login"}
            </button>

            <a
              className="btn btn-soft border-none bg-light text-dark hover:shadow-none hover:bg-gray-300"
              href="#googlelogin"
            >
              <img
                className="h-6"
                src={googleicon.link}
                alt={googleicon.name}
              />
              Login with Google
            </a>

            <div className="flex justify-between text-sm">
              <Link to="/register">Sign Up</Link>
              <Link to="/forgot-pw">Forgot Password</Link>
            </div>
          </form>
        </div>
        <div className="w-xs lg:w-lg flex flex-col items-center justify-center">
          <h1 className="text-center text-blue-500 text-3xl lg:text-5xl font-bold mb-4">
            HopeFund
          </h1>
          <p className="lg:text-xl">
            Mari jadi bagian dari gerakan kebaikan. Login atau daftar sekarang
            untuk mulai berdonasi dengan mudah, cepat, dan transparan.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

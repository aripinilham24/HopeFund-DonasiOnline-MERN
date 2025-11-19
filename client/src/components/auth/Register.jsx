import { Title } from "react-head";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { icons } from "../../assets/index.js";


const Register = () => {
  const googleicon = icons.find((icon) => icon.name === "google");
  const [isSubmitting, setSubmitting] = useState(false);

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
            username, email, password
        })
        

    } catch(err) {

    }
  };
  return (
    <>
      <Title>Sign Up</Title>
      <div className="min-h-screen flex items-center justify-center gap-10">
        <div className="flex items-center justfy-center">
          <form
            onSubmit={handlesignUp}
            className="rounded flex flex-col gap-5 shadow-lg p-5"
          >
            <h1 className="text-center font-bold text-2xl">Sign Up</h1>

            <label
              htmlFor="username"
              className="flex border border-gray-400 rounded p-3 gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500"
            >
              <i class="bi bi-person-fill"></i>
              <input
                type="text"
                name="username"
                placeholder="username"
                required
                className="w-xs outline-none"
              />
            </label>

            <label
              htmlFor="email"
              className="flex border border-gray-400 rounded p-3 gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500"
            >
              <i class="bi bi-envelope-fill"></i>
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                className="w-xs outline-none"
              />
            </label>

            <label
              htmlFor="password"
              className="flex border border-gray-400 rounded p-3 gap-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 focus-within:border-blue-500"
            >
              <i class="bi bi-key-fill"></i>
              <input
                type="password"
                name="password"
                placeholder="password"
                required
                className="w-xs outline-none"
              />
            </label>

            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 border-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading ..." : "Register"}
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

            <Link to="/login" className="text-center text-sm">
              have account
            </Link>
          </form>
        </div>

        <div className="w-lg flex flex-col items-center justify-center">
          <h1 className="text-center text-blue-500 text-5xl font-bold mb-4">
            HopeFund
          </h1>
          <p className="text-xl">
            Mari jadi bagian dari gerakan kebaikan. Login atau daftar sekarang
            untuk mulai berdonasi dengan mudah, cepat, dan transparan.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

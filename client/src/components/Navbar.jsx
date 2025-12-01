import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store.jsx";
import {url} from "../api/axios.js";
import { useState } from "react";

const navbar = () => {
  const { user, clearUser } = useUserStore();
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
    console.log("openNav", openNav);
  };

  const handleLogout = () => {
    clearUser();
    window.location.href = `/login`;
  };
  return (
    <nav className="navbar bg-linear-65 from-blue-500 to-blue-300 shadow-xl flex justify-between">
      <div className="flex-none lg:hidden">
        <button onClick={toggleNav} className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </button>
      </div>
      <div className="rounded">
        <a
          className="btn btn-ghost text-xl hover:bg-blue-500 hover:border-none"
          href="/"
        >
          HopeFund
        </a>
      </div>
      {/* nav link desktop */}
      <div className="justify-center gap-10 text-lg hidden lg:flex">
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/about"
        >
          About
        </NavLink>
        {/* <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/donations"
        >
          Donasi
        </NavLink> */}
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/how-it-works"
        >
          Cara Kerja
        </NavLink>
      </div>
      {/* nav link mobile */}
      <div className={`absolute top-18 rounded bg-gradient flex flex-col w-xs gap-5 p-5 font-bold ${openNav?"hidden":"block"} lg:hidden`}>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/about"
        >
          About
        </NavLink>
        {/* <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/donations"
        >
          Donasi
        </NavLink> */}
        <NavLink
          className={({ isActive }) => (isActive ? "underline" : "") + " hover:underline"}
          to="/how-it-works"
        >
          Cara Kerja
        </NavLink>
      </div>

      {user?.id ? (
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg text-white">{user.name}</span>
            <div>
              <img
                src={`${url}/uploads/image/profile/${user.avatar}`}
                className="w-10 rounded-full"
                alt="profile"
              />
            </div>
          </div>
          <div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default navbar;

import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store.jsx";
import { url } from "../api/axios.js";
import { useState } from "react";

const navbar = () => {
  const { user, clearUser } = useUserStore();
  const [openNav, setOpenNav] = useState(false);

  let login = false;
  if (user?.id) {
    login = true;
  }

  const toggleNav = () => {
    setOpenNav(!openNav);
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
        <Link
          className="btn btn-ghost text-xl hover:bg-blue-500 hover:border-none"
          to="/"
        >
          HopeFund
        </Link>
      </div>
      {/* nav link desktop */}
      <div className="justify-center gap-10 text-lg hidden lg:flex">
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/create-donation"
        >
          Buat Campaign
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/how-it-works"
        >
          Cara Kerja
        </NavLink>
      </div>

      {/* backdrop */}
      {openNav && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={toggleNav} // ❗ klik backdrop → nav hilang
        />
      )}

      {/* nav link mobile */}
      <div
        className={`absolute z-41 top-18 rounded bg-gradient flex flex-col w-xs gap-5 p-5 font-bold ${
          openNav ? "block" : "hidden"
        } lg:hidden`}
      >
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/create-donation"
        >
          Buat Campaign
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "underline" : "") + " hover:underline"
          }
          to="/how-it-works"
        >
          Cara Kerja
        </NavLink>

        <button
          onClick={handleLogout}
          className={`${login ? "block" : "hidden"} btn btn-secondary`}
        >
          Logout
        </button>
      </div>

      {user?.id ? (
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm lg:text-lg text-white">{user.name}</span>
            <div>
              <img
                src={`${url}/uploads/image/profile/${user.avatar}`}
                className="w-8 lg:w-10 rounded-full"
                alt="profile"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary hidden lg:block"
            >
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

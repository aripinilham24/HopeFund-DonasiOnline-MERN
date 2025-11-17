import {Link} from "react-router-dom";

const navbar = () => {
    return (
        <nav className="navbar bg-linear-65 from-blue-500 to-blue-300 shadow-xl">
            <div className="flex-none lg:hidden">
                <button className="btn btn-square btn-ghost">
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
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href="/">HopeFund</a>
            </div>
            <div>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        </nav>
    );
};

export default navbar;

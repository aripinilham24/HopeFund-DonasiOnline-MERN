import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu, X, HandHeart } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/create-donation", label: "Buat Campaign" },
  { to: "/how-it-works", label: "Cara Kerja" },
];

const Navbar = () => {
  const { user, clearUser } = useUserStore();
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => setOpenNav(!openNav);

  const handleLogout = () => {
    clearUser();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleNav}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            {openNav ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <HandHeart className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              HopeFund
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user?.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-accent/50 p-1 pr-3 transition-all duration-200 hover:scale-105">
                  <Avatar size="sm">
                    <AvatarImage
                      src={
                        user.avatar
                          ? `http://localhost:5000/uploads/image/profile/${user.avatar}`
                          : undefined
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground hidden sm:inline">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled className="font-medium">
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="transition-all duration-200 hover:scale-105 hover:shadow-md">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {openNav && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={toggleNav}
        />
      )}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          openNav ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-border/50">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleNav}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user?.id && (
            <Button
              variant="ghost"
              onClick={() => {
                handleLogout();
                toggleNav();
              }}
              className="w-full justify-start text-destructive hover:text-destructive mt-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

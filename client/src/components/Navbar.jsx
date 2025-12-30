// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  // class function for NavLink to apply "active" styling
  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 rounded transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
      isActive ? "bg-white/20 text-white font-semibold" : "text-white hover:bg-white/10"
    }`;

  return (
    <nav
      className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center"
      // removes the mobile tap highlight
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <h1 className="font-bold text-lg">Dashboard</h1>

      <div className="space-x-6 flex items-center">
        <NavLink to="/dashboard" className={navLinkClass}>
          Topics
        </NavLink>

        <NavLink to="/progress" className={navLinkClass}>
          Progress
        </NavLink>

        <NavLink to="/profile" className={navLinkClass}>
          Profile
        </NavLink>

        <button
          onClick={logout}
          className="bg-white text-blue-600 px-3 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

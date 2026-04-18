import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdWork,
  MdAdd,
  MdBookmark,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

const links = [
  { to: "/", icon: <MdDashboard />, label: "Overview" },
  { to: "/profile", icon: <FaUser />, label: "Employers profile" },
  { to: "/post-job", icon: <MdAdd />, label: "Post a Job" },
  { to: "/my-jobs", icon: <MdWork />, label: "My Jobs" },
  { to: "/saved", icon: <MdBookmark />, label: "Saved Candidate" },
  { to: "/settings", icon: <MdSettings />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div style={{ padding: "0 24px 32px" }}>
        <span
          style={{ fontSize: 20, fontWeight: 700, color: "var(--primary)" }}
        >
          JobPilot
        </span>
      </div>

      <p
        style={{
          fontSize: 11,
          color: "var(--text-secondary)",
          padding: "0 24px",
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        EMPLOYERS DASHBOARD
      </p>

      <nav style={{ flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 24px",
              textDecoration: "none",
              color: isActive ? "var(--primary)" : "#374151",
              background: isActive ? "var(--primary-light)" : "transparent",
              borderRight: isActive
                ? "3px solid var(--primary)"
                : "3px solid transparent",
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ fontSize: 18 }}>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: "0 24px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#374151",
            fontSize: 14,
          }}
        >
          <MdLogout size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
}
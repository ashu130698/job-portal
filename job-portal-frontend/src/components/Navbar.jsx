import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "var(--sidebar-width)",
        right: 0,
        height: 64,
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 32px",
        zIndex: 100,
      }}
    >
      <Link
        to="/post-job"
        style={{
          background: "#fff",
          border: "1.5px solid var(--primary)",
          color: "var(--primary)",
          padding: "8px 20px",
          borderRadius: 999,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500,
          marginRight: 16,
        }}
      >
        Post a Job
      </Link>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "#EC4899",
          cursor: "pointer",
        }}
      />
    </header>
  );
}
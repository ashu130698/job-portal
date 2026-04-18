import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs, deleteJob } from "../api/jobs";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import DeleteModal from "../components/DeleteModal";
import { MdMoreVert } from "react-icons/md";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()),
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await getAllJobs();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteJob(deleteId);
      setDeleteId(null);
      toast.success("Job deleted!");
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatus = (expirationDate) => {
    if (!expirationDate) return "Active";
    return new Date(expirationDate) > new Date() ? "Active" : "Expired";
  };

  const getDaysRemaining = (expirationDate) => {
    if (!expirationDate) return "No expiry";
    const diff = new Date(expirationDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days remaining` : "Expired";
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        My Jobs
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span />
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            fontSize: 14,
            width: 280,
            outline: "none",
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--text-secondary)",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 8 }}>No jobs posted yet</p>
          <p>Click "Post a Job" to get started</p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Jobs", "Status", "Applications", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr
                key={job._id}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td style={{ padding: "16px" }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>
                    {job.title}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {job.jobType} &nbsp;•&nbsp;{" "}
                    {getDaysRemaining(job.expirationDate)}
                  </p>
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      color:
                        getStatus(job.expirationDate) === "Active"
                          ? "var(--green)"
                          : "var(--red)",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    {getStatus(job.expirationDate) === "Active" ? "✓" : "!"}{" "}
                    {getStatus(job.expirationDate)}
                  </span>
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                  }}
                >
                  {job.applications || 0} Applications
                </td>
                <td style={{ padding: "16px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        border: "1.5px solid var(--primary)",
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      View Job
                    </button>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === job._id ? null : job._id)
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                        }}
                      >
                        <MdMoreVert size={20} color="#6B7280" />
                      </button>
                      {openMenu === job._id && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 32,
                            background: "#fff",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            zIndex: 10,
                            minWidth: 140,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        >
                          <button
                            onClick={() => {
                              navigate(`/edit-job/${job._id}`);
                              setOpenMenu(null);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 14,
                            }}
                          >
                            ✏️ Edit Job
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(job._id);
                              setOpenMenu(null);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 14,
                              color: "var(--red)",
                            }}
                          >
                            🗑️ Delete Job
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteId && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
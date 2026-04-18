import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, deleteJob } from "../api/jobs";
import Loader from "../components/Loader";
import DeleteModal from "../components/DeleteModal";
import { MdLocationOn, MdDelete } from "react-icons/md";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getJobById(id)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    await deleteJob(id);
    navigate("/");
  };

  if (loading) return <Loader />;
  if (!job) return <p style={{ padding: 32 }}>Job not found.</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Job Details</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setShowDelete(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--red)",
              fontSize: 22,
            }}
          >
            <MdDelete />
          </button>
          <button
            onClick={() => navigate(`/edit-job/${id}`)}
            style={{
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "10px 24px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Edit Job
          </button>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}
      >
        {/* Left */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            {job.title}
          </h2>
          <p style={{ lineHeight: 1.8, color: "#374151", marginBottom: 24 }}>
            {job.description}
          </p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Salary card */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  marginBottom: 4,
                }}
              >
                Salary (USD)
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                ${job.minSalary?.toLocaleString()} – $
                {job.maxSalary?.toLocaleString()}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                {job.salaryType} salary
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  marginBottom: 4,
                }}
              >
                Job Location
              </p>
              <p style={{ fontWeight: 600 }}>
                {job.city}, {job.country}
              </p>
            </div>
          </div>

          {/* Overview card */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Job Overview</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  label: "Job Posted",
                  value: new Date(job.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                },
                { label: "Job Expires on", value: job.expirationDate || "N/A" },
                { label: "Job Level", value: job.jobLevel || "N/A" },
                { label: "Experience", value: job.experienceLevel || "N/A" },
                { label: "Education", value: job.educationLevel || "N/A" },
                { label: "Job Type", value: job.jobType || "N/A" },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-secondary)",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
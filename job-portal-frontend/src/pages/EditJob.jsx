import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../api/jobs";
import Loader from "../components/Loader";

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  background: "#fff",
};

const selectStyle = { ...inputStyle, cursor: "pointer" };

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getJobById(id)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateJob(id, form);
      navigate(`/jobs/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!form) return <p>Job not found.</p>;

  return (
    <div style={{ maxWidth: 900 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Edit Job Details</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Job Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Tags
          </label>
          <input
            name="tags"
            value={form.tags || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Job Role
          </label>
          <select
            name="jobRole"
            value={form.jobRole || ""}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">Select</option>
            {["Designer", "Developer", "Manager", "Analyst", "Other"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
      </div>

      <h3 style={{ fontWeight: 600, marginBottom: 12, marginTop: 8 }}>
        Salary
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Min Salary
          </label>
          <input
            name="minSalary"
            type="number"
            value={form.minSalary || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Max Salary
          </label>
          <input
            name="maxSalary"
            type="number"
            value={form.maxSalary || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Salary Type
          </label>
          <select
            name="salaryType"
            value={form.salaryType || "Yearly"}
            onChange={handleChange}
            style={selectStyle}
          >
            {["Yearly", "Monthly", "Hourly"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <h3 style={{ fontWeight: 600, marginBottom: 12, marginTop: 8 }}>
        Advance Information
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Education Level
          </label>
          <select
            name="educationLevel"
            value={form.educationLevel || ""}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">Select</option>
            {["High School", "Graduation", "Post Graduation", "PhD"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={form.experienceLevel || ""}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">Select</option>
            {["No Experience", "1-2 years", "2-4 years", "4+ years"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Job Type
          </label>
          <select
            name="jobType"
            value={form.jobType || ""}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">Select</option>
            {["Full Time", "Part Time", "Contract", "Internship", "Remote"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Job Level
          </label>
          <select
            name="jobLevel"
            value={form.jobLevel || ""}
            onChange={handleChange}
            style={selectStyle}
          >
            <option value="">Select</option>
            {[
              "Entry Level",
              "Mid Level",
              "Senior Level",
              "Manager",
              "Director",
            ].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Expiration Date
          </label>
          <input
            name="expirationDate"
            type="date"
            value={form.expirationDate || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <h3 style={{ fontWeight: 600, marginBottom: 12, marginTop: 8 }}>
        Location
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Country
          </label>
          <input
            name="country"
            value={form.country || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            City
          </label>
          <input
            name="city"
            value={form.city || ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          marginBottom: 24,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          name="fullyRemote"
          checked={form.fullyRemote || false}
          onChange={handleChange}
        />
        Fully remote position
      </label>

      <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Job Description</h3>
      <textarea
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        rows={6}
        style={{ ...inputStyle, resize: "vertical" }}
      />
    </div>
  );
}
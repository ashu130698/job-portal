import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api/jobs";

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

export default function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tags: "",
    jobRole: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "Yearly",
    educationLevel: "",
    experienceLevel: "",
    jobType: "",
    jobLevel: "",
    expirationDate: "",
    country: "",
    city: "",
    fullyRemote: false,
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title) return alert("Job title is required");
    setLoading(true);
    try {
      await createJob(form);
      navigate("/my-jobs");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Post a job</h1>
      </div>

      {/* Row 1 */}
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
            placeholder="e.g. UX Designer"
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
            value={form.tags}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. React, Node"
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
            value={form.jobRole}
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

      {/* Salary */}
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
            value={form.minSalary}
            onChange={handleChange}
            style={inputStyle}
            placeholder="$70,000"
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
            value={form.maxSalary}
            onChange={handleChange}
            style={inputStyle}
            placeholder="$100,000"
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
            value={form.salaryType}
            onChange={handleChange}
            style={selectStyle}
          >
            {["Yearly", "Monthly", "Hourly"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advance Info */}
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
            value={form.educationLevel}
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
            value={form.experienceLevel}
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
            value={form.jobType}
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
            value={form.jobLevel}
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
            value={form.expirationDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Location */}
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
            value={form.country}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. India"
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
            value={form.city}
            onChange={handleChange}
            style={inputStyle}
            placeholder="e.g. Bangalore"
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
          checked={form.fullyRemote}
          onChange={handleChange}
        />
        Fully remote position
      </label>

      {/* Description */}
      <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Job Description</h3>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={6}
        style={{ ...inputStyle, resize: "vertical" }}
        placeholder="Describe the role, responsibilities, and requirements..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 24,
          background: "var(--primary)",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          padding: "12px 32px",
          fontSize: 15,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {loading ? "Posting..." : "Post Job"}
      </button>
    </div>
  );
}
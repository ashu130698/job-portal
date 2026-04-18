const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: { type: String },
    jobRole: { type: String },
    minSalary: { type: Number },
    maxSalary: { type: Number },
    salaryType: { type: String, default: "Yearly" },
    educationLevel: { type: String },
    experienceLevel: { type: String },
    jobType: { type: String },
    jobLevel: { type: String },
    expirationDate: { type: String },
    country: { type: String },
    city: { type: String },
    fullyRemote: { type: Boolean, default: false },
    description: { type: String },
    status: { type: String, default: "Active" },
    applications: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
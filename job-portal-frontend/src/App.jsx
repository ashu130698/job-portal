import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyJobs from "./pages/MyJobs";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            marginLeft: "var(--sidebar-width)",
            flex: 1,
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <main style={{ padding: "88px 32px 32px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/my-jobs" element={<MyJobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

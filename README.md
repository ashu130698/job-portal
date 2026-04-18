# JobPilot — Employer Job Portal

A full-stack job portal built for employers to manage job listings, built as part of a Full Stack Developer assessment.

## Live Demo
- Frontend: YOUR_VERCEL_URL
- Backend API: https://job-portal-backend-dfbo.onrender.com/api/jobs

## Tech Stack
- **Frontend:** React (Vite) + React Router + Axios
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Deployment:** Vercel (frontend) + Render (backend)

## Features
- View all posted jobs with status and application count
- Post a new job with full details (salary, location, job type, experience level, etc.)
- Edit existing job details
- Delete a job with confirmation modal
- Loading states on all data-fetching pages
- Empty state when no jobs are posted
- Clean REST API with full CRUD operations
- Responsive layout matching Figma design

## Project Structure
job-portal/
job-portal-backend/      → Express REST API
models/Job.js          → Mongoose schema
routes/jobs.js         → CRUD routes
server.js              → Entry point
job-portal-frontend/     → React application
src/
api/jobs.js          → All API calls
components/          → Sidebar, Navbar, Loader, DeleteModal
pages/               → Dashboard, MyJobs, JobDetail, PostJob, EditJob

## Local Setup

### Backend
```bash
cd job-portal-backend
npm install
```
Create `.env` file:

MONGO_URI=your_mongodb_connection_string
PORT=5000

```bash
node server.js
```

### Frontend
```bash
cd job-portal-frontend
npm install
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs |
| GET | /api/jobs/:id | Get single job |
| POST | /api/jobs | Create new job |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |
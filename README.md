# Job Track Lite 🚀

A modern **Job Tracking Web App** built with **MERN stack + Redux Toolkit (RTK)**, designed for managing jobs, applications, and user profiles efficiently. Ideal for portfolio demonstration and full-stack learning.

---

## 🌐 Tech Stack

- **Frontend:** React, Redux Toolkit (RTK), React Hook Form, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** Redux Toolkit with `createAsyncThunk` & slices
- **Forms & Validation:** React Hook Form + Zod (backend validation)
- **Notifications:** Global toast system via Redux (`uiSlice`)
- **Deployment Ready:** Full REST APIs, secure authentication, responsive UI

---

## ⚡ Features

- **Authentication & Profile**

  - Signup, Login, Logout
  - JWT-based authentication
  - View & update profile (name, phone, skills, address)

- **Job Management**

  - Add, edit, delete jobs
  - Filter jobs by status
  - Pagination for job listings
  - Skills parsing and salary validation

- **State Management**

  - Redux Toolkit slices for `auth` & `ui`
  - Async actions using `createAsyncThunk`
  - Local storage token persistence

- **UI/UX**
  - Responsive design
  - Real-time loading indicators
  - Global toast notifications for success/error
  - Form validation feedback

---

## 🔄 Application Flow

1. **User Signup / Login**
   - Form submission → API call via `authService` → Redux `authSlice` updates → Toast shows result
2. **Profile**
   - Fetch profile on mount (`getProfileThunk`) → Pre-fill form
   - Update profile → `updateProfileThunk` → Redux state updates → Toast shows success
3. **Jobs**
   - Fetch jobs → Store in Redux (`jobsSlice`)
   - Apply filters/pagination → Update state & URL query
   - Add/Edit/Delete → API calls → State & UI refresh
4. **Logout**
   - Clears Redux `auth` slice & localStorage → Redirect to login

---

## 📄 API Endpoints

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| POST   | `/auth/signup`  | Register a new user          |
| POST   | `/auth/login`   | Login user and get token     |
| GET    | `/auth/me`      | Get logged-in user's profile |
| PATCH  | `/auth/profile` | Update profile details       |
| GET    | `/jobs`         | Fetch all jobs               |
| POST   | `/jobs`         | Add a new job                |
| GET    | `/jobs/:id`     | Fetch job by ID              |
| PATCH  | `/jobs/:id`     | Update job by ID             |
| DELETE | `/jobs/:id`     | Delete job by ID             |

---

## 🛠 Setup & Run

```bash
# Clone repo
git clone https://github.com/yourusername/job-track-lite.git
cd job-track-lite

# Install frontend & backend dependencies
cd backend && npm install
cd ../frontend && npm install

# Run backend (port 5000)
cd ../backend && npm run dev

# Run frontend (port 3000)
cd ../frontend && npm start
```

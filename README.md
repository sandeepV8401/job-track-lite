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
🔥 ONE SCRIPT = ALL DOCS GENERATED AUTOMATICALLY
└── /scripts/generate-all-docs.js

🚀 Run: `node scripts/generate-all-docs.js`

✅ Generates:
├── postman-collection.json          (Postman ready)
├── swagger-ui docs                 (Backend APIs)
├── folder-structure.json           (Project map)
├── folder-structure.md            (README tree)
└── api-endpoints.md               (Complete API spec)


---

## 🌍 Live Demo & API Docs

- 🔗 **Frontend (Live App):**  
  https://job-track-lite.vercel.app/auth

- 📘 **Backend API Docs (Swagger):**  
  https://job-track-lite.onrender.com/api-docs/

- 🌐 **Backend Base URL:**  
  https://job-track-lite.onrender.com/

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

### 📌 Prerequisites

* Node.js **v20+ (recommended: 20.19.0 or above)**
* npm **v10+**

---

### 📥 Clone Repository

```bash
git clone https://github.com/sandeepV8401/job-track-lite.git job-track-lite
cd job-track-lite
```

---

### 📦 Install Dependencies

```bash
# Root (optional)
npm install

# Backend
cd backend
npm install

# Install nodemon (dev only)
npm install --save-dev nodemon

# Frontend
cd ../frontend
npm install
```

---

### 🚀 Run Application

#### ▶️ Start Backend

```bash
cd backend
npm run dev
```

👉 Runs on: `http://localhost:5000`

---

#### ▶️ Start Frontend

```bash
cd frontend
npm run dev
```

👉 Runs on: `http://localhost:5173`

---

### 🔗 Notes

* Frontend uses Vite (not CRA)
* Proxy is set to backend (`localhost:5000`)

---

# Run backend (port 5000)
cd ../backend && npm run dev

# Run frontend (port 3000)
cd ../frontend && npm start
```

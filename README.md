# Gurram Ganesh — AI Engineer Learner Portfolio Platform

A modern, high-performance portfolio application built with a **React 19 + TypeScript + Vite + Tailwind CSS** frontend and a dedicated **Node.js + Express + Prisma ORM + MySQL** backend service with full **MySQL Workbench** compatibility.

---

## 🏛️ System Architecture

```
ganesh_portfolio/
├── backend/                      # Node.js + Express + Prisma + MySQL API Server
│   ├── src/
│   │   ├── config/               # Prisma client & MySQL connectivity tests
│   │   ├── controllers/          # Business logic (auth, contact, projects, etc.)
│   │   ├── middleware/           # Auth (JWT), security (Helmet), error handling, rate limits
│   │   ├── routes/               # Express REST API route definitions
│   │   ├── validators/           # express-validator rules (contact form)
│   │   ├── seed.ts               # Database seeder with initial portfolio data
│   │   ├── app.ts                # Express application configuration
│   │   └── server.ts             # Server entrypoint (Port 5000)
│   ├── prisma/
│   │   └── schema.prisma         # Relational Prisma schema for MySQL
│   ├── scripts/
│   │   ├── schema.sql            # Direct SQL script executable in MySQL Workbench
│   │   └── test-api.js           # Automated test suite (8 tests)
│   ├── .env                      # Backend environment variables
│   ├── .env.example              # Example environment template
│   └── package.json
│
├── src/                          # React 19 Frontend
│   ├── components/               # UI components (Contact, Projects, VisitorCounter, etc.)
│   ├── services/
│   │   └── api.ts                # Centralized API service with offline/fallback resilience
│   ├── data/
│   │   └── portfolioData.ts      # Local baseline portfolio data
│   ├── types/
│   │   └── portfolio.ts          # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
│
├── .env                          # Frontend environment variables (VITE_API_URL)
├── .env.example                  # Frontend template
└── package.json                  # Frontend dependencies & build scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ or v20+ installed
- **MySQL Server**: v8.0 or v9.x (Installed and running on your system)
- **MySQL Workbench**: Installed for visual database inspection

---

### Step 1: Database Setup in MySQL Workbench
1. Open **MySQL Workbench**.
2. Connect to your local MySQL instance (**Local instance MySQL97** on port `3306` or **Local instance MySQL80** on port `3307`).
3. Click **File -> Open SQL Script...** and select:
   ```
   d:\ganesh_portfolio\backend\scripts\schema.sql
   ```
4. Click the **⚡ Execute** button (lightning bolt) to run the script.
5. This creates the database `portfolio_db` and all relational tables.

---

### Step 2: Configure Environment Variables

1. **Backend Environment** (`backend/.env`):
   Edit `backend/.env` with your MySQL password:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Replace YOUR_PASSWORD with your MySQL root password:
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/portfolio_db"

   JWT_SECRET="portfolio_jwt_secure_secret_development_key_982347"
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=ganichowdary07@gmail.com
   ADMIN_PASSWORD=AdminPassword123!
   ```

2. **Frontend Environment** (`.env` in root):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

---

### Step 3: Populate Database (Seeding)

Open PowerShell in the `backend/` directory:
```powershell
cd d:\ganesh_portfolio\backend
npm run prisma:generate
npm run prisma:push
npm run seed
```
This populates MySQL with Ganesh's personal details, projects, skills, education, experience, and roadmap steps.

---

### Step 4: Run the Application

You can run both frontend and backend in separate terminal windows:

#### Terminal 1 — Start the Backend Server:
```powershell
cd d:\ganesh_portfolio\backend
npm run dev
```
*Backend runs on `http://localhost:5000`*

#### Terminal 2 — Start the Frontend:
```powershell
cd d:\ganesh_portfolio
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🐬 Inspecting Data in MySQL Workbench

Open a SQL tab in MySQL Workbench and run:

```sql
-- Select database
USE portfolio_db;

-- Check all tables
SHOW TABLES;

-- View contact messages submitted via the website
SELECT * FROM contact_messages;

-- View projects
SELECT id, title, category, featured FROM projects;

-- View live visitor counter
SELECT * FROM visitor_stats;
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Backend & MySQL connectivity health check |
| `GET` | `/api/personal` | Public | Get personal profile & stats |
| `PUT` | `/api/personal` | Admin (JWT) | Update personal profile |
| `GET` | `/api/projects` | Public | Get all projects (`?category=AI&featured=true`) |
| `GET` | `/api/projects/:id` | Public | Get single project |
| `POST` | `/api/projects` | Admin (JWT) | Add new project |
| `PUT` | `/api/projects/:id` | Admin (JWT) | Update project |
| `DELETE` | `/api/projects/:id` | Admin (JWT) | Delete project |
| `GET` | `/api/skills` | Public | Get skill categories and skills |
| `POST` | `/api/skills` | Admin (JWT) | Add skill |
| `GET` | `/api/education` | Public | Get academic history |
| `GET` | `/api/experience` | Public | Get experience overview |
| `GET` | `/api/journey` | Public | Get journey roadmap steps |
| `POST` | `/api/contact` | Public (Rate-limited) | Submit contact message (stores in MySQL) |
| `GET` | `/api/contact` | Admin (JWT) | View submitted messages in inbox |
| `GET` | `/api/visitor` | Public | Get current visitor count |
| `POST` | `/api/visitor/increment` | Public | Increment live visitor counter |
| `POST` | `/api/auth/login` | Public | Admin login (returns JWT token) |
| `GET` | `/api/auth/me` | Admin (JWT) | Get current authenticated admin |

---

## 🛡️ Resilience & Security Features
1. **Zero-Downtime Fallback**: If the backend is temporarily offline or database is unreachable, the frontend automatically falls back to local data so the site never shows blank states or crashes.
2. **Security Headers**: Uses `helmet` for HTTP security headers and strictly configured `cors`.
3. **Input Validation**: `express-validator` validates all fields on `/api/contact`. Invalid payloads are rejected with clear 400 Bad Request error lists.
4. **Rate Limiting**: Public contact submissions are rate-limited to 5 submissions per 15 minutes per IP to eliminate spam.
5. **No Credential Exposure**: `.env` is kept in `.gitignore`. No database or secret tokens are ever exposed to the client bundle.

---

## 🧪 Automated Testing

Run the test suite in `backend/`:
```powershell
cd d:\ganesh_portfolio\backend
node scripts/test-api.js
```
Expected output:
```
🧪 Starting API Automated Test Suite...

✅ PASS: GET /health returns health info
✅ PASS: POST /contact rejects empty payload with 400
✅ PASS: POST /contact rejects invalid email & short message
✅ PASS: POST /projects rejects unauthenticated request with 401
✅ PASS: PUT /projects/:id rejects unauthenticated request with 401
✅ PASS: DELETE /projects/:id rejects unauthenticated request with 401
✅ PASS: POST /auth/login rejects empty payload with 400
✅ PASS: GET /nonexistent returns 404 with JSON message

========================================
📊 Test Summary: 8 passed, 0 failed
========================================
```

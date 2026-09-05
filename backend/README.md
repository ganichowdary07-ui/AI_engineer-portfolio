# Portfolio Backend API & MySQL Database

A production-ready Node.js, Express.js, TypeScript, and Prisma ORM backend service for **Gurram Ganesh's Personal Portfolio**.

---

## 🏗️ Architecture Overview

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts                  # Prisma client & database connection tester
│   ├── controllers/
│   │   ├── authController.ts       # Admin login, register, and /me
│   │   ├── personalController.ts   # Personal profile & stats GET/PUT
│   │   ├── projectsController.ts   # Projects CRUD operations
│   │   ├── skillsController.ts     # Skill categories & skills CRUD
│   │   ├── educationController.ts  # Academic history CRUD
│   │   ├── experienceController.ts # Experience summary GET/PUT
│   │   ├── journeyController.ts    # Learning roadmap CRUD
│   │   ├── contactController.ts    # Message submission & admin inbox
│   │   └── visitorController.ts    # Live visitor counter tracking
│   ├── middleware/
│   │   ├── authMiddleware.ts       # JWT bearer token verification
│   │   ├── errorHandler.ts         # Centralized HTTP error handler
│   │   └── rateLimiter.ts          # DDoS & contact spam prevention
│   ├── routes/                     # Grouped Express REST API routes
│   ├── validators/
│   │   └── contactValidator.ts     # Input validation rules
│   ├── seed.ts                     # Database seeder with portfolio defaults
│   ├── app.ts                      # Express app setup, CORS, Helmet
│   └── server.ts                   # HTTP server entrypoint
├── prisma/
│   └── schema.prisma               # Prisma relational schema for MySQL
├── scripts/
│   ├── schema.sql                  # Standalone DDL script for MySQL Workbench
│   └── test-api.js                 # Automated API test suite
├── .env                            # Local environment configuration
├── .env.example                    # Template environment variables
├── package.json
└── tsconfig.json
```

---

## 🐬 MySQL Server & Database Setup

### 1. Identify Your Local MySQL Server
You already have MySQL Server installed on your machine:
- **MySQL 9.7** (Default Port: `3306`)
- **MySQL 8.0** (Port: `3307`)

### 2. Create the Database & Tables in MySQL Workbench
1. Open **MySQL Workbench**.
2. Click on your local MySQL connection (e.g. **Local instance MySQL97** or **Local instance MySQL80**).
3. In Workbench, go to **File -> Open SQL Script...** and select:
   ```
   d:\ganesh_portfolio\backend\scripts\schema.sql
   ```
4. Click the **⚡ Execute** (lightning bolt) icon to run the entire script.
5. This automatically:
   - Creates the database `portfolio_db` if it doesn't already exist.
   - Creates all tables: `users`, `personal_info`, `personal_stats`, `education`, `skill_categories`, `skills`, `projects`, `journey_steps`, `experiences`, `contact_messages`, and `visitor_stats`.

---

## ⚙️ Environment Variables (`.env`)

In `backend/.env`, configure your database credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MySQL Database Connection URL (Prisma format)
# Format: mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
# If using MySQL 9.7 (port 3306):
DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/portfolio_db"

# If using MySQL 8.0 (port 3307):
# DATABASE_URL="mysql://root:YOUR_MYSQL_PASSWORD@localhost:3307/portfolio_db"

# JWT Authentication Secret for Admin Endpoints
JWT_SECRET="portfolio_jwt_secure_secret_development_key_982347"
JWT_EXPIRES_IN=7d

# Initial Admin Credentials (for seed script)
ADMIN_USERNAME=admin
ADMIN_EMAIL=ganichowdary07@gmail.com
ADMIN_PASSWORD=AdminPassword123!
```

---

## 🚀 Running Migrations & Seeding

Once your `backend/.env` password is set:

```powershell
# In d:\ganesh_portfolio\backend:

# 1. Generate Prisma Client
npm run prisma:generate

# 2. Push schema to MySQL (synchronizes models with MySQL tables)
npm run prisma:push

# 3. Seed portfolio data into MySQL
npm run seed
```

---

## 🖥️ Running the Backend Server

```powershell
# Start backend in development mode (auto-reloads with tsx)
npm run dev
```

The server will start on:
`http://localhost:5000`

---

## 🔍 Inspecting Data in MySQL Workbench

Once the backend is running and seeded, you can inspect your live database at any time in MySQL Workbench:

```sql
-- Select your database
USE portfolio_db;

-- List all tables
SHOW TABLES;

-- View contact messages submitted through the website
SELECT * FROM contact_messages ORDER BY created_at DESC;

-- View projects
SELECT id, title, category, featured FROM projects;

-- View skills
SELECT c.name AS category, s.name AS skill, s.proficiency, s.level 
FROM skills s
JOIN skill_categories c ON s.category_id = c.id
ORDER BY c.order_index, s.order_index;

-- View visitor count
SELECT * FROM visitor_stats;
```

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` — Checks server and MySQL connectivity status.

### Public Endpoints (Consumed by Portfolio Frontend)
- `GET /api/personal` — Get personal details and highlight statistics.
- `GET /api/projects` — Get all portfolio projects (supports `?category=AI` and `?featured=true`).
- `GET /api/projects/:id` — Get single project by ID.
- `GET /api/skills` — Get all skill categories and child skills.
- `GET /api/education` — Get academic history.
- `GET /api/experience` — Get experience card details.
- `GET /api/journey` — Get roadmap / journey steps.
- `POST /api/contact` — Submit a message via contact form (Validated & rate-limited).
- `GET /api/visitor` — Get live visitor count.
- `POST /api/visitor/increment` — Increment visitor counter.

### Authentication & Protected Admin Endpoints
- `POST /api/auth/login` — Authenticate admin (`identifier` + `password`). Returns JWT token.
- `POST /api/auth/register` — Register new admin user.
- `GET /api/auth/me` — Verify current JWT token.
- `PUT /api/personal` — Update personal details. *(Requires Bearer Token)*
- `POST /api/projects` — Create new project. *(Requires Bearer Token)*
- `PUT /api/projects/:id` — Update project. *(Requires Bearer Token)*
- `DELETE /api/projects/:id` — Delete project. *(Requires Bearer Token)*
- `POST /api/skills` — Add skill. *(Requires Bearer Token)*
- `PUT /api/skills/:id` — Update skill. *(Requires Bearer Token)*
- `DELETE /api/skills/:id` — Delete skill. *(Requires Bearer Token)*
- `POST /api/education` — Add education record. *(Requires Bearer Token)*
- `PUT /api/education/:id` — Update education record. *(Requires Bearer Token)*
- `DELETE /api/education/:id` — Delete education record. *(Requires Bearer Token)*
- `PUT /api/experience` — Update experience record. *(Requires Bearer Token)*
- `POST /api/journey` — Add journey step. *(Requires Bearer Token)*
- `PUT /api/journey/:id` — Update journey step. *(Requires Bearer Token)*
- `DELETE /api/journey/:id` — Delete journey step. *(Requires Bearer Token)*
- `GET /api/contact` — View all submitted contact messages. *(Requires Bearer Token)*
- `PATCH /api/contact/:id/status` — Mark message status (`read`, `replied`, `archived`). *(Requires Bearer Token)*
- `DELETE /api/contact/:id` — Delete contact message. *(Requires Bearer Token)*

---

## 🧪 Testing the APIs

Run the automated test suite:
```powershell
node scripts/test-api.js
```

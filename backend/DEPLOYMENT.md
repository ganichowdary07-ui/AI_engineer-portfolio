# 🌐 Free Cloud Backend Deployment & Admin Guide

This guide details how to deploy **Gurram Ganesh's Portfolio Backend** online completely **FREE** (with 0 monthly costs and no credit card required) and access your data via the **Admin Portal**.

---

## 🎯 Architecture Summary

- **Backend Web Service**: Hosted on **Render.com** (100% Free Web Service tier) or **Koyeb**.
- **Cloud Database**: **TiDB Cloud Serverless** (25 GB MySQL database, free forever, wire-compatible with MySQL 8.0 & Prisma).
- **Frontend & Admin Portal**: Deployed on **Vercel** with a built-in Admin Portal accessible via `#admin` or the Shield icon in the footer.

---

## 📋 Step-by-Step Deployment (Takes ~5 Minutes)

### Step 1: Create a Free Cloud MySQL Database (TiDB Cloud)
1. Go to **[https://tidbcloud.com](https://tidbcloud.com)** and sign in with **GitHub** (100% free, no credit card required).
2. Click **Create Cluster** and select **Serverless (Free Tier)**.
3. Choose your closest region (e.g. `ap-southeast-1` or `us-east-1`).
4. Click **Create**. Your free 25GB MySQL database is created in ~30 seconds.
5. In the cluster dashboard, click **Connect**:
   - Select **Prisma** or **General Connection**.
   - Generate a secure password and copy your connection string URL.
   - It will look like:
     ```
     mysql://<user>.<prefix>:<password>@gateway01.<region>.prod.aws.tidbcloud.com:4000/portfolio_db?sslaccept=strict
     ```

---

### Step 2: Push Your Code to GitHub
Make sure all recent changes and the `backend` folder are pushed to your GitHub repository:
```powershell
# From project root:
git add .
git commit -m "feat: complete backend API, SQLite/MySQL dual support, and Admin Portal"
git push origin main
```

---

### Step 3: Deploy Backend on Render.com (100% Free)
1. Go to **[https://render.com](https://render.com)** and sign in with **GitHub**.
2. Click **New +** -> **Web Service**.
3. Connect your repository: `ganichowdary07-ui/AI_engineer-portfolio`.
4. Configure the Web Service settings:
   - **Name**: `ganesh-portfolio-backend`
   - **Region**: Same region as your database (or closest to you).
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm run start
     ```
   - **Instance Type**: **Free**
5. Under **Environment Variables**, add:
   - `DATABASE_URL`: *(Paste your TiDB Cloud MySQL connection URL from Step 1)*
   - `JWT_SECRET`: *(Any long random string, e.g. `ganesh_super_secret_jwt_2026`)*
   - `JWT_EXPIRES_IN`: `7d`
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_EMAIL`: `ganichowdary07@gmail.com`
   - `ADMIN_PASSWORD`: `AdminPassword123!` *(or your preferred custom password)*
   - `FRONTEND_URL`: `https://ganesh-portfolio.vercel.app`
6. Click **Create Web Service**.
7. Render will build and deploy your backend automatically. Once finished, you will get your live URL:
   ```
   https://ganesh-portfolio-backend.onrender.com
   ```

---

### Step 4: Synchronize & Seed Database (Run Once)
In Render's **Shell** tab (or locally pointing `DATABASE_URL` to your cloud DB):
```bash
# Push the Prisma schema to create tables in the cloud database
npx prisma db push

# Seed your default portfolio data and admin account
npx tsx src/seed.ts
```

---

### Step 5: Connect Your Vercel Frontend to the Live Backend
In your **Vercel Project Dashboard** for `ganesh.portfolio`:
1. Go to **Settings** -> **Environment Variables**.
2. Add:
   - `VITE_API_URL`: `https://ganesh-portfolio-backend.onrender.com/api`
3. Click **Save** and trigger a redeploy (or push a new commit).

---

## 🔐 How to Access Data with Admin Login

Your portfolio includes a built-in **Admin Portal**:

1. **How to Open**:
   - Click the **Shield (🛡️)** icon or **"Admin Login"** link in the website footer.
   - Or press **`Ctrl + Shift + A`** on any page.
   - Or open your website URL with `#admin` (e.g. `https://ganesh-portfolio.vercel.app/#admin`).

2. **Default Credentials**:
   - **Username**: `admin`
   - **Password**: `AdminPassword123!` *(or whatever you set in `ADMIN_PASSWORD`)*

3. **What You Can Do in the Admin Portal**:
   - **📬 Contact Inbox**: View all messages sent through the website contact form, see sender IP and timestamps, mark status as `read` or `replied`, or delete spam.
   - **💼 Projects Manager**: Add new projects, edit titles, descriptions, categories, links, or delete old projects.
   - **📊 System & Analytics**: View live visitor counter statistics and check backend API health status.

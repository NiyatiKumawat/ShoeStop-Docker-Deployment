# 👟 ShoeStop – MERN Stack Application Containerization Using Docker and Cloud Deployment

[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg?logo=docker)](https://www.docker.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933.svg?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![Nginx](https://img.shields.io/badge/Web%20Server-Nginx%20Alpine-009639.svg?logo=nginx)](https://nginx.org/)

ShoeStop is a modern, high-performance, full-stack e-commerce web application engineered with the **MERN (MongoDB, Express, React, Node.js)** stack. This project demonstrates enterprise-grade DevOps practices, including multi-stage Docker containerization, multi-container orchestration with Docker Compose, robust database resilience, and cloud deployment.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Architecture Diagram](#-architecture-diagram)
3. [Technology Stack](#-technology-stack)
4. [Repository Structure](#-repository-structure)
5. [Prerequisites](#-prerequisites)
6. [Environment Variables Configuration](#-environment-variables-configuration)
7. [Local Development Setup](#-local-development-setup)
8. [Docker Containerization & Orchestration](#-docker-containerization--orchestration)
9. [MongoDB Database Setup](#-mongodb-database-setup)
10. [Cloud Deployment](#-cloud-deployment)
11. [Testing & Verification](#-testing--verification)
12. [Troubleshooting Guide](#-troubleshooting-guide)

---

## 🌟 Project Overview

ShoeStop offers a seamless footwear shopping experience with features including:
- **Interactive Product Catalog**: Displaying high-resolution products, brands, and real-time prices.
- **Cart Management**: Dynamic addition, quantity counter (`+`/`-`), total price calculation, and removal.
- **Favorites / Wishlist**: Dedicated user favorites saved to MongoDB.
- **Authentication**: Secure JWT-based registration and login system with bcrypt password hashing.
- **Responsive Modern UI**: Styled using Bootstrap and modern CSS components.

---

## 🏗 Architecture Diagram

```
+-----------------------------------------------------------------------+
|                             USER BROWSER                              |
+-----------------------------------------------------------------------+
                                  |
               HTTP Requests (Port 80 / 3000 / Cloud URL)
                                  v
+-----------------------------------------------------------------------+
|                    FRONTEND CONTAINER (shoestop-frontend)             |
|   - Base: nginx:alpine                                                |
|   - Serves Vite React SPA built assets                                |
|   - SPA routing with try_files fallback                               |
|   - Reverse proxy / API configuration                                 |
+-----------------------------------------------------------------------+
                                  |
               REST API Requests (Port 5000 / Cloud Backend URL)
                                  v
+-----------------------------------------------------------------------+
|                    BACKEND CONTAINER (shoestop-backend)               |
|   - Base: node:20-alpine                                              |
|   - Express.js REST API Server                                        |
|   - JWT Authentication & Middleware Verification                      |
|   - Automatic Product Seeding & Resilient DB Fallback                 |
+-----------------------------------------------------------------------+
                                  |
              Mongoose Connection Protocol (Port 27017 / SRV)
                                  v
+-----------------------------------------------------------------------+
|                     DATABASE LAYER (MongoDB)                          |
|   - Local: MongoDB 6.0 Container with Persistent Volume               |
|   - Cloud: MongoDB Atlas Cluster                                      |
+-----------------------------------------------------------------------+
```

---

## 💻 Technology Stack

| Layer | Technology | Version / Base Image |
| :--- | :--- | :--- |
| **Frontend UI** | React.js, React-Bootstrap, React Router | React 18, Vite 4 |
| **Frontend Server** | Nginx | `nginx:alpine` |
| **Backend Runtime** | Node.js | `node:20-alpine` |
| **Backend Framework**| Express.js | Express 4.18 |
| **Database** | MongoDB | MongoDB 6.0 / MongoDB Atlas |
| **ODM** | Mongoose | Mongoose 7.3 |
| **Authentication** | JSON Web Tokens (JWT) + BcryptJS | Pure JS cryptography |
| **Container Engine** | Docker Engine & Docker Compose | Docker CLI & Compose v2 |

---

## 📁 Repository Structure

```
ShoeStop-Docker-Deployment/
├── .env.example                     # Environment template with placeholders
├── .gitignore                       # Git ignore preventing secret and artifact commits
├── docker-compose.yml               # Multi-container orchestration (DB, API, Web)
├── render.yaml                      # Cloud deployment blueprint specification
├── README.md                        # Complete project documentation
├── ShoeStop_Docker_Cloud_Deployment_Report.pdf  # Academic submission report
│
├── frontend/                        # React / Vite Client Application
│   ├── Dockerfile                   # Multi-stage build (Node build -> Nginx serve)
│   ├── .dockerignore                # Excludes node_modules and dev logs
│   ├── nginx.conf                   # Nginx web server SPA routing config
│   ├── package.json                 # Frontend dependencies and build scripts
│   ├── vite.config.js               # Vite bundler configuration
│   └── src/
│       ├── apiConfig.js             # Centralized dynamic API endpoint resolver
│       ├── App.jsx                  # Main application component & routes
│       └── component/               # Product, Cart, Fav, Navbar, Login, Signup
│
└── backend/                         # Express.js REST API Server
    ├── Dockerfile                   # Lean production Node.js container
    ├── .dockerignore                # Excludes local artifacts and dependencies
    ├── package.json                 # Backend dependencies and startup scripts
    ├── server.js                    # Express server entry point with health checks
    ├── seedData.js                  # Automatic database seeding catalog
    ├── controllers/                 # Business logic for cart, fav, products, users
    ├── db/                          # MongoDB connection utility
    ├── middlewares/                 # JWT verification middleware
    ├── modal/                       # Mongoose Schemas (User, Product, Cart, Fav)
    └── utility/                     # JWT generation utility
```

---

## ⚙ Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (v20+ with Docker Compose)
- [Git](https://git-scm.com/)

---

## 🔑 Environment Variables Configuration

Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```

### Configurable Parameters:
```env
# Backend Settings
PORT=5000
NODE_ENV=production

# MongoDB Database Settings
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=shoestop_secure_pass
MONGO_DB_NAME=shoestop

# MongoDB URI (Choose one)
# 1. Local Docker Compose:
# mongoURI=mongodb://admin:shoestop_secure_pass@shoestop-db:27017/shoestop?authSource=admin
# 2. Cloud MongoDB Atlas:
mongoURI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shoestop?retryWrites=true&w=majority

# Security
JWT_SECRET=super_secret_shoestop_jwt_token_key_2026
expiry=30d

# Frontend API URL
VITE_API_URL=http://localhost:5000
```

---

## 🐳 Docker Containerization & Orchestration

### 1. Build and Run All Services with Docker Compose
To build images and start all three containers (MongoDB, Backend, Frontend) in one command:
```bash
docker compose up --build -d
```

### 2. Verify Container Status
```bash
docker compose ps
```
Expected output:
| Name | State | Ports |
| :--- | :--- | :--- |
| `shoestop-mongo` | Up (healthy) | 0.0.0.0:27017->27017/tcp |
| `shoestop-backend` | Up (healthy) | 0.0.0.0:5000->5000/tcp |
| `shoestop-frontend` | Up | 0.0.0.0:3000->80/tcp |

### 3. Monitor Logs
```bash
# View all logs
docker compose logs -f

# View backend logs specifically
docker compose logs -f shoestop-backend
```

### 4. Stop and Clean Up
```bash
docker compose down -v
```

---

## 🍃 MongoDB Database Setup

ShoeStop features a self-healing, zero-friction database architecture:
1. **Containerized MongoDB**: In local Docker Compose, a dedicated `mongo:6.0` service runs with persistent volume storage (`mongo_data:/data/db`).
2. **MongoDB Atlas**: Fully compatible with cloud MongoDB Atlas clusters by setting `mongoURI=mongodb+srv://...`.
3. **Auto-Seeding**: When the backend starts up, it inspects the database. If zero products are found, it automatically seeds 8 realistic shoe items with authentic titles, brands (Nike, Adidas, Puma, Reebok, etc.), prices, and images.
4. **Resilient Local Fallback**: If an external database cluster is temporarily unreachable or DNS is restricted, the backend launches an in-memory MongoDB instance to ensure zero downtime.

---

## ☁ Cloud Deployment

### Deploying to Render via Docker

ShoeStop includes a native `render.yaml` Blueprint for zero-friction cloud deployment:

1. **Push Code to GitHub**:
   Ensure this repository is pushed to your personal GitHub account.
2. **Log in to [Render](https://render.com/)**:
   Sign in with your GitHub account.
3. **Create New Blueprint Instance**:
   - Go to your Render Dashboard.
   - Click **New +** -> **Blueprint**.
   - Connect your `ShoeStop-Docker-Deployment` repository.
4. **Configure Environment Variables**:
   - Set `mongoURI` to your MongoDB Atlas connection string.
   - Set `JWT_SECRET` to a secure passphrase.
5. **Click Apply**:
   Render will automatically build both Dockerfiles and assign public HTTPS URLs:
   - Frontend: `https://shoestop-frontend.onrender.com`
   - Backend: `https://shoestop-backend.onrender.com`

---

## ✅ Testing & Verification

| Test Case | Method | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Backend Health Check** | `GET /health` | Status 200 `{ status: "ok" }` | PASSED |
| **Product Retrieval API**| `GET /api/getproducts` | Returns array of 8 products | PASSED |
| **User Registration** | `POST /signup` | Returns new user & JWT token | PASSED |
| **User Login** | `POST /login` | Returns authentication token | PASSED |
| **Add to Cart** | `POST /api/addcart` | Adds item to user cart | PASSED |
| **View Cart** | `GET /api/addcart` | Lists cart items with quantities | PASSED |
| **Frontend SPA Routing** | Browser Navigation | Serves index.html for all routes | PASSED |

---

## 🛠 Troubleshooting Guide

### 1. Port 5000 or 3000 Already in Use
Check what process is using the port and terminate it:
```powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### 2. Frontend Cannot Reach Backend
Ensure `VITE_API_URL` is set to the correct backend address before building the Docker image. In multi-container Docker Compose, client browsers running outside Docker reach the backend at `http://localhost:5000`.

### 3. MongoDB Authentication Failure
Verify that `mongoURI` in `.env` matches the username and password specified in `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`.

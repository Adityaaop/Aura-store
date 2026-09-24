# AURA — Modern Tech & Minimalist Lifestyle E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-AURA_Store-6366f1?style=for-the-badge&logo=render&logoColor=white)](https://aura-store-aditya-rxg8.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg?style=for-the-badge)](https://aura-store-aditya-rxg8.onrender.com)
[![Author: Aditya](https://img.shields.io/badge/Author-Aditya-indigo.svg?style=for-the-badge)](https://github.com/Adityaaop)

A bespoke, full-stack e-commerce web application engineered with the **MERN** stack (MongoDB, Express.js, React, Node.js), Redux Toolkit, and Tailwind CSS. Built with an obsidian dark aesthetic, glassmorphic UI, and seamless shopping workflows.

🔗 **Live Production URL:** [https://aura-store-aditya-rxg8.onrender.com](https://aura-store-aditya-rxg8.onrender.com)

![AURA Showcase](/auraa.png)

---

## 🌐 Live Demo & Testing Credentials

Experience the live application deployed on Render:
- **Live Store URL:** [https://aura-store-aditya-rxg8.onrender.com](https://aura-store-aditya-rxg8.onrender.com)

### Pre-Configured Test Accounts:
| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Store Admin** | `admin@aura.store` | `admin123456` | Full Admin Dashboard, Sales Analytics, Product CRUD, User Management |
| **Demo Customer** | `customer@aura.store` | `customer123456` | Browsing, Cart, Wishlist, Checkout, Order Tracking |

---

## ✨ Features

- **⚡ Modern Architecture**: Built on Vite + React 18 frontend and modular Node.js/Express backend.
- **🔍 Spotlight Search (`Cmd + K`)**: Interactive spotlight modal for instant product discovery across categories and keywords.
- **🎨 Bespoke Visuals & Dark Aesthetic**: Custom glassmorphism, responsive navigation dock, curated typography, and micro-interactions.
- **🔐 Secure Authentication**: JWT authentication with http-only secure cookies, password hashing with bcrypt, and role-based access control (Admin & Customer).
- **🛒 Dynamic Cart & Wishlist**: Real-time cart state management with Redux Toolkit and interactive wishlist/favorites system.
- **📦 Comprehensive Product Management**: Category filtering, price filtering, brand selectors, multi-image support, stock tracking, and user reviews.
- **💳 Integrated Checkout & Orders**: Streamlined shipping address capture, order summary, PayPal sandbox checkout, and status tracking (Paid / Delivered).
- **📊 Admin Control Center**: Interactive dashboard with ApexCharts sales trends, category CRUD, product creation/editing, and user management.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Tailwind CSS & Obsidian Dark Glassmorphic Design System
- **Icons**: React Icons (`react-icons`)
- **Carousel / Charts**: Slick Carousel & ApexCharts
- **Payments**: PayPal React SDK

### Backend
- **Server**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & Cookie Parser
- **File Uploads**: Multer disk storage for local media
- **Concurrency**: Concurrently for running full-stack development

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or MongoDB Atlas URI

### 2. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example`):

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/auraStore
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 3. Installation
Install root dependencies and frontend dependencies:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 4. Seed Database (Optional)
Populate the store with curated tech & lifestyle products:

```bash
npm run data:import
```

### 5. Run the Application
Start both the backend server and frontend development server simultaneously:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

---

## 📁 Project Structure

```
├── backend/
│   ├── config/          # Database configuration (Mongoose)
│   ├── controllers/     # Express route controllers (Users, Products, Orders, Categories)
│   ├── data/            # Sample seed data & products
│   ├── middlewares/     # Authentication & error handlers
│   ├── models/          # MongoDB Mongoose schemas
│   ├── routes/          # Express API route declarations
│   ├── utils/           # JWT creation and helpers
│   ├── index.js         # Backend server entrypoint
│   └── seeder.js        # Database populate script
├── frontend/
│   ├── public/          # Public assets & brand graphics
│   ├── src/
│   │   ├── components/  # Reusable UI components (SpotlightSearch, Header, Loader, Modal, etc.)
│   │   ├── pages/       # Route views (Home, Shop, Cart, ProductDetails, Admin, Auth)
│   │   ├── redux/       # RTK slices & API endpoints
│   │   ├── App.jsx      # Main layout wrapper
│   │   ├── index.css    # Design tokens & global CSS
│   │   └── main.jsx     # Router setup & app bootstrap
│   ├── index.html       # HTML entrypoint & typography
│   └── vite.config.js   # Vite configuration & API proxy
└── uploads/             # Product media and uploaded imagery
```

---

## 👤 Author
Developed and engineered by **Aditya**.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

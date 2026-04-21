# 🎧 Nexus Headphone | Premium Audio Experience

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Nexus Headphone is a high-performance landing page for a premium audio brand. It features a modern, responsive UI with a fully integrated Express.js backend for product management and order processing.

---

## ✨ Features

- **🎯 Dynamic Collection**: Products are fetched in real-time from the Express backend.
- **🛒 Advanced Cart System**: Add items, update quantities, and remove products with a smooth side drawer.
- **🚀 One-Click Checkout**: Integrated order submission to the backend with instant feedback.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **✨ Premium Animations**: Powered by Framer Motion, GSAP, and Lucide React.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion & GSAP
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Dotenv, JSON Parser
- **Development**: Nodemon

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

You can now start both the frontend and backend with a single command!

1. **Clone the repository** (if you haven't already)
2. **Install all dependencies**:
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

3. **Run the development servers**:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
├── app/               # Next.js App Router (Frontend)
├── components/        # Reusable React Components
├── lib/               # Utilities and Zustand Store
├── public/            # Static Assets (Images, Icons)
├── backend/           # Express.js Server
│   ├── server.js      # Main Entry Point
│   ├── .env           # Backend Configuration
│   └── README.md      # Backend Specific Docs
└── package.json       # Root Dependencies & Scripts
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/products` | Fetch all available headphones |
| `GET`  | `/api/products/:id` | Get details for a specific product |
| `POST` | `/api/orders` | Submit a new customer order |

---

## 🎨 Credits
Designed and built for a premium user experience.

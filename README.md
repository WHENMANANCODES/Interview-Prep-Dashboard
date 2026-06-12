# PrepTrack | Interview & DSA Prep Dashboard

PrepTrack is a premium, full-stack Data Structures, Algorithms, and Interview Preparation tracking platform. Built with an ultra-modern dark glassmorphism interface, it helps software engineering candidates streamline their coding journey, track problem-solving streaks, and analyze platform engagement metrics in a centralized, secure repository.

---

## 🎨 Core Highlights

* **Sleek Dark UI:** Beautifully crafted layout utilizing dark mode glassmorphism components with neon Indigo and Cyan accents.
* **Secure Authentication Pipeline:** Rock-solid signup and login flows protected by custom JWT authorization middleware.
* **Separation of Concerns:** Backend structured systematically following the MVC architecture pattern.
* **Real-Time Analytics:** Embedded visitor tracking and engagement monitoring.
* **Intuitive User Flows:** Logout confirmation modal, password visibility toggles, and protected routes.

---

## 💻 Tech Stack

| Layer        | Technologies Used                                        |
| ------------ | -------------------------------------------------------- |
| **Frontend** | React.js, Tailwind CSS, React Router v6, Recharts, Axios |
| **Backend**  | Node.js, Express.js, JWT Authentication                  |
| **Database** | MongoDB Atlas                                            |
| **Hosting**  | Render (Backend), Vercel (Frontend)                      |

---

# 📐 System Architecture & Data Flow

PrepTrack follows a decoupled **Client-Server Architecture** structured around the **MVC (Model-View-Controller)** design pattern.

```text
┌────────────────────────────────────────────────────────┐
│                   FRONTEND (Client)                    │
│  [React.js + Vite] ── Deployed on Vercel               │
│                                                        │
│ Components (Dashboard, Problems, Sheets, Navbar)       │
│                          │                             │
│              State Management / Axios Requests         │
└──────────────────────────┼─────────────────────────────┘
                           │
                    HTTPS REST Calls
                           │
┌──────────────────────────▼─────────────────────────────┐
│                   BACKEND (Server)                     │
│  [Node.js + Express.js] ── Deployed on Render          │
│                                                        │
│  Routes → Middleware → Controllers → Models           │
└──────────────────────────┼─────────────────────────────┘
                           │
                    Mongoose ODM
                           │
┌──────────────────────────▼─────────────────────────────┐
│                   DATABASE (Cloud)                     │
│                 MongoDB Atlas Cluster                  │
└────────────────────────────────────────────────────────┘
```

---

# 🧩 Component Hierarchy

```text
main.jsx
│
└── App.jsx
    │
    ├── Public Routes
    │   ├── Login
    │   └── Register
    │
    └── Protected Routes
        │
        └── ProtectedRoute
            │
            ├── Navbar
            │
            ├── Dashboard
            │   ├── StatsCard
            │   ├── Streak
            │   ├── Weekly Progress
            │   └── AddProblemForm
            │
            ├── ProblemsPage
            │   └── ProblemTable
            │
            └── Sheets
                ├── SheetBrowser
                ├── SheetCard
                └── Hard.jsx
```

---

# 📂 Folder Structure

```text
PrepTrack
│
├── backend
│   ├── controllers
│   │   └── authController.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── Models
│   │   ├── UserModel.js
│   │   └── Problem.js
│   │
│   ├── routes
│   │   ├── authroutes.js
│   │   └── problems.js
│   │
│   ├── package.json
│   └── server.js
│
├── public
│   ├── logo.svg
│   └── favicon.svg
│
└── src
    ├── components
    │   ├── Dashboard.jsx
    │   ├── ProblemTable.jsx
    │   ├── SheetCard.jsx
    │   ├── Navbar.jsx
    │   └── ProtectedRoute.jsx
    │
    ├── services
    │   ├── api.js
    │   └── authService.js
    │
    ├── App.jsx
    └── main.jsx
```

---

# 🔐 Authentication Flow

```text
User Login/Register
        │
        ▼
Frontend Form
        │
        ▼
Axios Request
        │
        ▼
Express Route
        │
        ▼
Controller Logic
        │
        ▼
MongoDB Validation
        │
        ▼
JWT Token Generated
        │
        ▼
Stored in LocalStorage
        │
        ▼
Protected Route Access
```

---

# 📊 Features

* User Authentication (JWT)
* Protected Routes
* DSA Problem Tracking
* Coding Sheet Management
* Topic-wise Problem Segregation
* Daily Streak Tracking
* Weekly Progress Analytics
* Recharts Visualizations
* Responsive UI
* Dark Glassmorphism Design
* Logout Confirmation Modal

---

# 🚀 Future Enhancements

* AI-Powered Problem Recommendations
* Contest Tracking
* LeetCode API Integration
* GitHub Profile Analytics
* Interview Preparation Roadmap
* Personalized Performance Insights

---

## 🌐 Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 📜 License

This project is developed for learning, portfolio building, and interview preparation purposes.




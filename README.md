# 🚀 DSA Prep Dashboard

A modern **DSA tracking and analytics dashboard** built using React to help maintain consistency, track progress, and improve problem-solving during technical interview preparation.

🔗 **Live Demo:** https://dsa-prep-dashboard.vercel.app/

---

## 📌 Overview

This project helps users track their DSA journey in a structured and visual way.

It provides:
- Streak tracking for consistency 🔥  
- Weekly analytics for performance 📊  
- Topic-wise and difficulty-wise insights  
- Sheet-based structured preparation  

The goal is to make DSA preparation **data-driven, consistent, and motivating**.

> Designed as a foundation for integrating AI-based preparation strategies in future versions.

---

## ✨ Features

### 📊 Dashboard
- Total problems solved
- Weekly progress overview
- Current streak display
- Hard problem tracking

### 🔥 Streak System
- Current streak calculation
- Longest streak tracking
- Last 30 days activity consistency
- Topic-wise problem distribution
- Difficulty breakdown (Easy / Medium / Hard)

### 📅 Weekly Analytics
- Problems solved per day (bar chart)
- Difficulty distribution (pie chart)
- Last 7 days performance tracking

### 📘 Sheet-Based Practice
- Practice problems from sheets (Striver etc.)
- Track solved problems per sheet
- Completion percentage tracking

### 📚 Problem Management
- Add solved problems with:
  - Name
  - Difficulty
  - Topic
  - Date
  - Notes
- Search and filter problems
- View complete problem history

### 💾 Data Persistence
- Uses browser localStorage
- Data remains even after refresh

### 🎨 UI/UX
- Premium dark theme
- Glassmorphism-inspired design
- Smooth transitions and hover effects
- Responsive layout

---

## 📸 Screenshots

### 🧠 Dashboard
<img width="3839" height="2145" alt="Screenshot 2026-04-02 121745" src="https://github.com/user-attachments/assets/3adb27db-d7e3-4528-83e7-78233e7b6239" />
)

---

### 📘 Sheets Page

<img width="3833" height="2136" alt="Screenshot 2026-04-02 122259" src="https://github.com/user-attachments/assets/77e5b55f-872f-478c-aa55-674e8861bc9f" />
)

---

### 📊 Weekly Analytics
<img width="3837" height="2142" alt="Screenshot 2026-04-02 122324" src="https://github.com/user-attachments/assets/56806bb4-5604-40bf-b6f8-87efba6943b5" />

)

---

### 🔥 Streak Page

<img width="3830" height="2143" alt="Screenshot 2026-04-02 122351" src="https://github.com/user-attachments/assets/6d97e70e-df5b-4bc2-b38d-8f794139f712" />
)


---

### 📚 Problems Page

<img width="3837" height="2143" alt="Screenshot 2026-04-02 123204" src="https://github.com/user-attachments/assets/7b7078f0-7ef3-48d2-8a5b-936531698be9" />

)

---

## 🛠 Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- React Router
- JavaScript (ES6)
- LocalStorage

---

## 🏗 Architecture Overview

```bash
src/
  assets/                  # Static assets (images, icons)

  components/              # Reusable UI components
    AddProblemForm.jsx     # Form to add solved problems
    Dashboard.jsx          # Main dashboard page
    Navbar.jsx             # Navigation bar
    Problemspage.jsx       # Problem history page
    ProblemTable.jsx       # Table for displaying problems
    SheetBrowser.jsx       # Sheet selection page
    SheetCard.jsx          # Individual sheet card
    StatsCard.jsx          # Dashboard stat cards
    Streak.jsx             # Streak tracking and analytics
    Weekly.jsx             # Weekly performance charts
    Hard.jsx               # (To be replaced with AI feature)

  data/                    # Sheet/problem data

  App.jsx                  # Root component
  main.jsx                 # React entry point
  index.css                # Global styles
  App.css                  # Additional styles

Interview Prep Dashboard 

A simple and clean **DSA preparation tracker dashboard** built to help track daily problem-solving progress during technical interview preparation.

This project allows users to **log solved problems, track difficulty, add notes, and visualize weekly progress** using charts.

## 📌 Features

* ✅ Add solved problems with:

  * Problem name
  * Difficulty level (Easy / Medium / Hard)
  * Topic
  * Date solved
  * Personal notes

* 📊 **Weekly Problems Chart**

  * Visualizes the number of problems solved in the **last 7 days**

* 🗂 **Problem History**

  * View all solved problems in a structured list

* 📝 **Notes for Revision**

  * Add insights or reminders for future revision

* 💾 **Local Storage Support**

  * Data persists even after refreshing the browser

* 🎨 **Clean UI**

  * Built with TailwindCSS for a minimal and responsive layout

---

## 🛠 Tech Stack

* **React.js**
* **JavaScript (ES6)**
* **Tailwind CSS**
* **Recharts** (for progress visualization)



📂 Project Structure

Interview-Prep-Dashboard
│
├── public/                 # Static assets
│
├── src/
│   ├── assets/             # Images or static resources
│
│   ├── components/         # Reusable UI components
│   │   ├── AddProblemForm.jsx   # Form to add solved problems
│   │   ├── Dashboard.jsx        # Main dashboard page
│   │   ├── Hard.jsx             # Hard problems statistics
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Problemspage.jsx     # Page showing solved problems
│   │   ├── StatsCard.jsx        # Statistics cards
│   │   ├── Streak.jsx           # Problem solving streak tracker
│   │   └── Weekly.jsx           # Weekly problems solved chart
│
│   ├── data/               # Data storage / mock data
│
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   ├── App.css             # Global styles
│   └── index.css           # Tailwind / base styles
│
├── index.html              # Root HTML file
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation


##  Getting Started

### 1️⃣ Clone the repository

```
git clone https://github.com/WHENMANANCODES/Interview-Prep-Dashboard.git
```

### 2️⃣ Navigate to the project

```
cd Interview-Prep-Dashboard
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Run the development server

```
npm run dev
```

The app will start locally.

---

## Purpose of this Project

This project is built to:

* Track **DSA problem-solving consistency**
* Improve **interview preparation discipline**
* Practice **React development and data visualization**

---

## 🔮 Future Improvements

* Add **problem filtering by topic**
* Add **difficulty statistics**
* Add **GitHub / LeetCode integration**
* Add **monthly progress analytics**
* Deploy the dashboard online

## 👨‍💻 Author

**Manan Jain**

B.Tech Student | Aspiring Software Developer
Currently preparing for **Software Engineering Roles**

GitHub:
https://github.com/WHENMANANCODES


⭐ If you find this project useful, feel free to **star the repository**!

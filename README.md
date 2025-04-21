# 🎓 College Companion App

An all-in-one mobile solution for students and parents, built using **React Native** for the frontend and **Express.js + MongoDB** for the backend.  
This app serves as a digital bridge between students, their academic data, and their guardians – enabling real-time access to attendance, fees, performance, and more.

---

## 📱 Features

### 👩‍🎓 Student Dashboard
- 📚 **LMS (Learning Management System)**
  - Daily attendance view
  - Total attendance count
- 💸 **Fees Section**
  - Fee status & payment history
- 📖 **Digital Handbook**
  - Institution rules, guidelines, and important resources
- 🧑‍💼 **Profile**
  - View and manage personal info
- 🤖 **AI Chatbot Assistant**
  - Get answers related to academics, campus info, deadlines, and more

---

### 👨‍👩‍👧‍👦 **Parents' Access (Highlighted Feature)**
Parents have their own secure login and can:
- ✅ View their child’s **daily and total attendance**
- 📊 Access **fee history and payment status**
- 🗣️ Read **teacher feedback** about their child
- 🧾 View **semester-wise academic performance and marks**

> 🔐 Parents' access is **completely separate** from student accounts to ensure data privacy and proper authorization.

---

## 🛠️ Tech Stack

| Layer      | Technology     |
|------------|----------------|
| Frontend   | React Native   |
| Backend    | Express.js     |
| Database   | MongoDB        |
| Auth       | JWT, bcrypt    |
| AI Chatbot | OpenAI / Dialogflow |
| State Management | Context API / Redux |
| API Calls  | Axios          |

---

## 🧩 Folder Structure

frontend/src/
│── components/      
│   ├── AttendanceCard.js   # Reusable component for attendance display
│   ├── FeesCard.js         # Fee history card
│   ├── Chatbot.js          # AI chatbot UI
│
│── screens/      
│   ├── LoginScreen.js      # User authentication screen
│   ├── StudentDashboard.js # Student homepage (LMS, fees, profile)
│   ├── ParentDashboard.js  # Parent homepage (student data)
│   ├── AttendanceScreen.js # Daily attendance
│   ├── FeesScreen.js       # Fee history
│   ├── FeedbackScreen.js   # Teacher feedback
│   ├── MarksScreen.js      # Semester marks
│   ├── ChatbotScreen.js    # AI chatbot
│
│── navigation/
│   ├── AppNavigator.js     # Stack & Tab navigation
│
│── context/      
│   ├── AuthContext.js      # Handles global authentication state
│
│── utils/
│   ├── api.js              # Axios setup for API calls
│   ├── helpers.js          # Utility functions
│
│── assets/                 # Static assets (images, icons)
│
│── App.js                  # Main entry point
│── index.js                # Root file
│── package.json            # Dependencies & metadata
│── babel.config.js         # Babel configuration

📬 Contact
Developed by Soumen Das
📧 Email: dassoumen0818@gmail.com
🌐 LinkedIn: https://www.linkedin.com/in/soumen-das-76b867218/
🚀 GitHub: https://github.com/soumen0818


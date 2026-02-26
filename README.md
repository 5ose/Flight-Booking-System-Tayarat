# ✈️ Flight Booking System

## 📦 Project Setup Guide

Follow these steps after cloning the repository:

---

## 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd Flight-Booking-System
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies (Vite + React)

```bash
cd ../frontend
npm install
```

---

## 4️⃣ Setup Environment Variables (Backend)

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/flight-booking
JWT_SECRET=your_secret_key
```

---

## 5️⃣ Run the Backend Server

```bash
cd backend
npm run dev
```

Backend will run on:
```
http://localhost:5000
```

---

## 6️⃣ Run the Frontend (Vite)

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

## ✅ You're Ready!

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`
- Make sure MongoDB is running before starting the backend.

Happy Coding 🚀
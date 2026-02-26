require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Flight Booking API is running...");
});
  const User = require("./models/User");
const Flight = require("./models/Flight");
const Booking = require("./models/Booking");

// Test DB
app.get("/test-db", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: "hashedpassword"
    });

    const flight = await Flight.create({
      flightNumber: "FL123",
      from: "Cairo",
      to: "Dubai",
      date: new Date("2026-03-01T10:00:00"),
      totalSeats: 150,
      availableSeats: 150,
      price: 500
    });

    const booking = await Booking.create({
      user: user._id,
      flight: flight._id,
      numberOfSeats: 2,
      totalPrice: 1000
    });

    res.json({ user, flight, booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
// import User from "./models/User.js"; // remove in production, only for testing purposes


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);




// Home Route
app.get("/", (req, res) => {
  res.send("Tayarat API is running...");
});


app.get("/", (req, res) => {
  res.send("Flight Booking API is running...");
});


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




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // --- CRUD Routes --- // remove in production, only for testing purposes

// // Create User
// app.post("/users", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get All Users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get Single User
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Update User
// app.put("/users/:id", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email },
//       { new: true, runValidators: true }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Delete User
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


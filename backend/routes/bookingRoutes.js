import express from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// All booking routes are protected (require authentication)
router.use(authMiddleware);

// Create booking
router.post("/", createBooking);

// Get my bookings
router.get("/my-bookings", getMyBookings);

// Cancel booking
router.put("/:id", cancelBooking);

export default router;
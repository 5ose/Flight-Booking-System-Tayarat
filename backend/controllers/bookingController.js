import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { flightId, numberOfSeats } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate input
    if (!flightId || !numberOfSeats) {
      return res.status(400).json({ 
        success: false, 
        message: "Flight ID and number of seats are required" 
      });
    }

    if (numberOfSeats < 1) {
      return res.status(400).json({ 
        success: false, 
        message: "Number of seats must be at least 1" 
      });
    }

    // Find flight
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ 
        success: false, 
        message: "Flight not found" 
      });
    }

    // Check available seats
    if (flight.availableSeats < numberOfSeats) {
      return res.status(400).json({ 
        success: false, 
        message: `Only ${flight.availableSeats} seats available` 
      });
    }

    // Calculate total price
    const totalPrice = flight.price * numberOfSeats;

    // Create booking
    const booking = new Booking({
      user: userId,
      flight: flightId,
      numberOfSeats,
      totalPrice,
      status: "confirmed"
    });

    await booking.save();

    // Reduce available seats
    flight.availableSeats -= numberOfSeats;
    await flight.save();

    // Populate flight details for response
    await booking.populate("flight", "flightNumber from to date price");

    res.status(201).json({ 
      success: true, 
      message: "Booking created successfully",
      booking 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const bookings = await Booking.find({ user: userId })
      .populate("flight", "flightNumber from to date price availableSeats totalSeats")
      .sort({ createdAt: -1 }); // Most recent first

    res.json({ 
      success: true, 
      count: bookings.length,
      bookings 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    // Find booking
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    // Check ownership
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized: You can only cancel your own bookings" 
      });
    }

    // Check if already canceled
    if (booking.status === "canceled") {
      return res.status(400).json({ 
        success: false, 
        message: "Booking is already canceled" 
      });
    }

    // Update booking status
    booking.status = "canceled";
    await booking.save();

    // Restore available seats
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.availableSeats += booking.numberOfSeats;
      await flight.save();
    }

    res.json({ 
      success: true, 
      message: "Booking canceled successfully",
      booking 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createBooking, getMyBookings, cancelBooking };
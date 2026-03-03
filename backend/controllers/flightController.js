import Flight from "../models/Flight.js";

// CREATE Flight
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET All Flights
export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Flight
export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Flight
export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE Flight
export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH Flights
export const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    // Validate required filters
    if (!from || !to || !date) {
      return res.status(400).json({
        message: "from, to, and date are required"
      });
    }

    // Validate date format
    const searchDate = new Date(date);
    if (isNaN(searchDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format"
      });
    }

    // Create start & end of the day
    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    // MongoDB Filtering
    const flights = await Flight.find({
      from: { $regex: new RegExp(`^${from}$`, "i") }, // case insensitive
      to: { $regex: new RegExp(`^${to}$`, "i") },
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (flights.length === 0) {
      return res.status(404).json({
        message: "No flights found"
      });
    }

    res.status(200).json(flights);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
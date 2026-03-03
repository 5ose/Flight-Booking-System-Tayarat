import express from "express";
import {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
} from "../controllers/flightController.js";

const router = express.Router();

router.post("/", createFlight);
router.get("/search", searchFlights);
router.get("/", getAllFlights);
router.get("/:id", getFlightById);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);

export default router;
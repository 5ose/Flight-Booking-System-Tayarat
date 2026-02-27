// routes/userRoutes.js
import express from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);

// Protected route example
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
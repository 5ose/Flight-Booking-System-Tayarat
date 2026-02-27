// middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

    /*A bearer token is a security token used in API authentication that grants access to 
    whoever possesses ("bears") it, 
    without requiring further proof of identity. It acts like a digital key, 
    enabling the holder to access protected resources. */ 

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user id to request
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false, 
        message: "Token expired. Please login again." 
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token." 
    });
  }
};

export default authMiddleware;
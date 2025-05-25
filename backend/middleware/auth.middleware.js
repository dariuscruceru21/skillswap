import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized access - No acces Token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;

      next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired, please login again" });
        }
        throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(401).json({ message: "errorInternal server " });
  }
};

export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        return next();
    }else {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
}


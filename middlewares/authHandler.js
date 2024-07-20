import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authHandler = async (req, res, next) => {
  console.log("Inside Auth Handler Method");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, token failed",
        error: error,
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

export { authHandler };

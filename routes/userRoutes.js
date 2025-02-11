import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authHandler, getProfile);

export default router;

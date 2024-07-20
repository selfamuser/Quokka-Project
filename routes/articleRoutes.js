import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  updateArticle,
} from "../controllers/articleController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/createArticle", authHandler, createArticle);
router.get("/getAllArticles", getAllArticles);
router.delete("/deleteArticle/:id", authHandler, deleteArticle);
router.patch("/updateArticle/:id", authHandler, updateArticle);
export default router;

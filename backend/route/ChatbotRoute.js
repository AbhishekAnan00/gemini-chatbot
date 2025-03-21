import express from "express";
import { chatWithGemini } from "../controller/ChatbotController.js";

const router = express.Router();

router.post("/send", chatWithGemini);

export default router;

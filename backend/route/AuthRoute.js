import express from "express";
import { signIn } from "../controller/AuthController.js";

const router = express.Router();

router.post("/signin", signIn);

export default router;

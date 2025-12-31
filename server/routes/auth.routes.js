import express from "express";
import { getTopics } from "../controllers/topic.controller.js";
import auth from "../middleware/auth.middleware.js";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/register", register);

router.post("/login", login);

router.get("/", auth, getTopics);

export default router;

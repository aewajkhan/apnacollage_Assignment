import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getUserLevels,
  markSubtopicComplete,
} from "../controllers/progress.controller.js";
import Progress from "../models/Progress.js";

const router = express.Router();

router.post("/toggle", auth, markSubtopicComplete);

//  /progress/user
router.get("/user", auth, async (req, res) => {
  const progress = await Progress.find({ userId: req.user.id });
  res.json(progress);
});

router.get("/levels", auth, getUserLevels);

export default router;

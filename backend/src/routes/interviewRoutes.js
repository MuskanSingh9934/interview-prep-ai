import express from "express";
import {
  startInterview,
  evaluateInterview,
  getNextQuestion,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/start", startInterview);
router.post("/evaluate", evaluateInterview);
router.post("/question", getNextQuestion);

export default router;

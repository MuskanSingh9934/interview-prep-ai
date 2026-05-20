import Interview from "../models/Interview.js";
import * as aiService from "../services/aiService.js";

/**
 * Start Interview
 */
export const startInterview = async (req, res) => {
  try {
    const { topic = "General", difficulty = "Medium" } = req.body;

    console.log("Generating question...");

    const question = await aiService.generateQuestion(topic, difficulty);

    const interview = await Interview.create({
      topic,
      difficulty,
      question,
      completed: false,
    });

    return res.status(200).json({
      success: true,
      interviewId: interview._id,
      question,
    });
  } catch (error) {
    console.log("START ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to start interview session",
    });
  }
};

/**
 * Evaluate Answer
 */
export const evaluateInterview = async (req, res) => {
  try {
    const { interviewId, userAnswer } = req.body;

    if (!interviewId) {
      return res.status(400).json({
        success: false,
        error: "Interview ID required",
      });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: "Interview not found",
      });
    }

    const evaluation = await aiService.evaluateAnswer(
      interview.question,
      userAnswer,
    );

    interview.userAnswer = userAnswer;

    interview.score = evaluation.score || 0;

    interview.feedback = evaluation.feedback || "";

    interview.completed = true;

    await interview.save();

    let nextQuestion = await aiService.generateQuestion(
      interview.topic,
      interview.difficulty,
    );

    return res.status(200).json({
      success: true,
      score: evaluation.score,
      feedback: evaluation.feedback,
      nextQuestion,
    });
  } catch (error) {
    console.log("EVALUATE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to evaluate answer",
    });
  }
};

/**
 * Next Question
 */
export const getNextQuestion = async (req, res) => {
  try {
    const { topic = "General", difficulty = "Medium" } = req.body;

    const question = await aiService.generateQuestion(topic, difficulty);

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

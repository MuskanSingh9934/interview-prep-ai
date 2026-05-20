import { useState, useCallback } from "react";
import { startInterview, evaluateAnswer } from "../services/api";

const useInterview = () => {
  const [question, setQuestion] = useState("");
  const [interviewId, setInterviewId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [questionNumber, setQuestionNumber] = useState(1);

  const [finished, setFinished] = useState(false);

  const start = useCallback(async (topic, difficulty) => {
    try {
      setLoading(true);

      setError("");

      setFinished(false);

      setQuestion("");

      setQuestionNumber(1);

      setEvaluation(null);

      const data = await startInterview(topic, difficulty);

      console.log("AI Interview:", data);

      setQuestion(data?.question || "Question generation failed");

      setInterviewId(data?.interviewId || Date.now());

      return data;
    } catch (err) {
      console.error(err);

      setError(err?.message || "Unable to generate interview");

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(
    async (userAnswer) => {
      if (!userAnswer?.trim()) {
        setError("Answer required");

        return null;
      }

      try {
        setLoading(true);

        setError("");

        const result = await evaluateAnswer(interviewId, userAnswer);

        setEvaluation(result);

        if (result?.nextQuestion) {
          setQuestion(result.nextQuestion);

          setQuestionNumber((prev) => prev + 1);
        } else {
          setFinished(true);
        }

        return result;
      } catch (err) {
        console.error(err);

        setError(err?.message || "Evaluation failed");

        return {
          score: 0,
          feedback: "Unable to evaluate",
        };
      } finally {
        setLoading(false);
      }
    },
    [interviewId],
  );

  const reset = useCallback(() => {
    setQuestion("");

    setInterviewId(null);

    setLoading(false);

    setError("");

    setEvaluation(null);

    setQuestionNumber(1);

    setFinished(false);
  }, []);

  return {
    question,
    interviewId,
    loading,
    error,
    evaluation,
    questionNumber,
    finished,
    start,
    submitAnswer,
    reset,
  };
};

export default useInterview;

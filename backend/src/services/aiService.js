export async function generateQuestion(topic, difficulty) {
  const questions = [
    `Explain basics of ${topic}`,
    `Tell me about a project related to ${topic}`,
    `What challenges did you face in ${topic}?`,
    `How would you improve an existing product?`,
    `Difference between frontend and backend`,
    `Explain React hooks`,
    `How do APIs work?`,
    `Tell me about yourself`,
    `How do you handle deadlines?`,
  ];

  const randomIndex = Math.floor(Math.random() * questions.length);

  return questions[randomIndex];
}

export async function evaluateAnswer(question, answer) {
  const text = answer?.trim() || "";

  let score = 40;
  let feedback = "Try giving more detailed answers.";

  if (text.length > 50) {
    score = 70;
    feedback = "Good answer.";
  }

  if (text.length > 120) {
    score = 85;
    feedback = "Strong explanation with good clarity.";
  }

  if (text.length > 200) {
    score = 95;
    feedback = "Excellent detailed response.";
  }

  return {
    score,
    feedback,
  };
}

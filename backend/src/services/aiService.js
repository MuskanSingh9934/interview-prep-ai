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

  return {
    question: questions[randomIndex],
  };
}

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_URL + "/api";
async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || data?.error || "Request failed");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);

    throw err;
  }
}

/* START INTERVIEW */

export const startInterview = async (
  topic = "general",
  difficulty = "Medium",
) => {
  const data = await request(`${BASE_URL}/interview/start`, {
    method: "POST",

    body: JSON.stringify({
      topic,
      difficulty,
    }),
  });

  return {
    question: data?.question || "",

    interviewId: data?.interviewId || Date.now(),
  };
};

/* SUBMIT ANSWER */

export const evaluateAnswer = async (interviewId, userAnswer) => {
  const data = await request(`${BASE_URL}/interview/evaluate`, {
    method: "POST",

    body: JSON.stringify({
      interviewId,
      userAnswer,
    }),
  });

  return {
    score: data?.score ?? 0,

    feedback: data?.feedback || "",

    nextQuestion: data?.nextQuestion || null,
  };
};

/* RESULTS */

export const getResults = async () => {
  return request(`${BASE_URL}/results`);
};

/* LOGIN */

export const loginUser = async (email, password) => {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",

    body: JSON.stringify({
      email,
      password,
    }),
  });
};

/* GOOGLE LOGIN */

export const googleLogin = async () => {
  return {
    success: true,

    user: {
      name: "User",

      email: "user@example.com",
    },
  };
};

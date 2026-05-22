import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON middleware
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Backend Running 🚀",
  });
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/results", resultRoutes);

export default app;

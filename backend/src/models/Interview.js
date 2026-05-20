import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard', 'easy', 'medium', 'hard']
    },
    question: {
      type: String,
      required: true
    },
    userAnswer: {
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default: 0
    },
    feedback: {
      type: String,
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;

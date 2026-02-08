const express = require('express');
const router = express.Router();

const lessons = [
  { id: 1, title: "What is Money?", content: "Money is what we use to buy things we need and want.", level: "beginner" },
  { id: 2, title: "Saving vs Spending", content: "Saving means keeping money for later. Spending means using money now.", level: "beginner" },
  { id: 3, title: "What are Stocks?", content: "Stocks are tiny pieces of companies you can own.", level: "intermediate" }
];

router.get('/lessons', (req, res) => {
  res.json(lessons);
});

router.get('/quiz/:lessonId', (req, res) => {
  const quizzes = {
    1: [{ question: "What do we use money for?", options: ["Buy things", "Eat it", "Throw it"], answer: 0 }],
    2: [{ question: "What is saving?", options: ["Using money now", "Keeping money for later", "Losing money"], answer: 1 }]
  };
  res.json(quizzes[req.params.lessonId] || []);
});

module.exports = router;
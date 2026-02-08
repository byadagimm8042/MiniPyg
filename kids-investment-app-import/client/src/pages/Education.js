import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

function Education({ user }) {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/education/lessons`);
      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setQuiz([]);
    setScore(0);
  };

  const startQuiz = async (lessonId) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/education/quiz/${lessonId}`);
      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const answerQuestion = (questionIndex, answerIndex) => {
    if (quiz[questionIndex].answer === answerIndex) {
      setScore(score + 1);
    }
    
    if (questionIndex === quiz.length - 1) {
      alert(`Quiz completed! Score: ${score + (quiz[questionIndex].answer === answerIndex ? 1 : 0)}/${quiz.length}`);
      setQuiz([]);
      setCurrentLesson(null);
    }
  };

  return (
    <div className="education">
      <h1>🎓 Learn About Money & Investing</h1>

      {!currentLesson ? (
        <div className="lessons-grid">
          {lessons.map(lesson => (
            <div key={lesson.id} className="lesson-card">
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
              <div className="lesson-level">{lesson.level}</div>
              <button onClick={() => startLesson(lesson)}>
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="lesson-content">
          <button onClick={() => setCurrentLesson(null)} className="back-btn">
            ← Back to Lessons
          </button>
          
          <h2>{currentLesson.title}</h2>
          <div className="lesson-text">
            <p>{currentLesson.content}</p>
          </div>

          {quiz.length === 0 ? (
            <div className="lesson-actions">
              <button onClick={() => startQuiz(currentLesson.id)}>
                Take Quiz 🧠
              </button>
            </div>
          ) : (
            <div className="quiz">
              <h3>Quiz Time! 🎯</h3>
              {quiz.map((question, qIndex) => (
                <div key={qIndex} className="question">
                  <h4>{question.question}</h4>
                  <div className="options">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => answerQuestion(qIndex, oIndex)}
                        className="option-btn"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="fun-facts">
        <h3>💡 Fun Money Facts</h3>
        <div className="facts-grid">
          <div className="fact">The first coins were made 2,700 years ago!</div>
          <div className="fact">A penny costs more than 1 cent to make</div>
          <div className="fact">The stock market helps companies grow</div>
        </div>
      </div>
    </div>
  );
}

export default Education;
import React, { useState, useEffect } from "react";
import "./Quiz.css"; // Add a CSS file for styling

const originalQuestions = [
  { question: "Can you use a Water extinguisher on an electrical fire?", answer: false },
  { question: "Is a Wet Chemical extinguisher best for cooking oil fires?", answer: true },
  { question: "Can a CO₂ extinguisher be used on live electrical equipment?", answer: true },
  { question: "Should you use a Foam extinguisher on an electrical fire?", answer: false },
  { question: "Can a Dry Powder extinguisher handle gaseous fires?", answer: true },
  { question: "Is it safe to use a CO₂ extinguisher in a small, enclosed space without ventilation?", answer: false },
  { question: "Do you need to stand at least 1 meter away when using a Wet Chemical extinguisher?", answer: true },
  { question: "Should you test a fire extinguisher by spraying a little before using it in an emergency?", answer: false },
  { question: "Can Foam and Dry Powder extinguishers be used on flammable liquid fires?", answer: true },
  { question: "Should you always aim at the base of the fire when using an extinguisher?", answer: true }
];

const FireExtinguisherQuiz = () => {
  const [playerName, setPlayerName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Shuffle questions when the quiz starts
    setShuffledQuestions(shuffleArray(originalQuestions));
  }, []);

  const handleAnswer = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    setTimeout(() => {
      if (isCorrect === shuffledQuestions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < shuffledQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setShowResult(true);
      }
      setSelectedAnswer(null);
    }, 1000);
  };

  const restartGame = () => {
    setShuffledQuestions(shuffleArray(originalQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setPlayerName("");
    setNameSubmitted(false);
  };

  return (
    <div className="quiz-container">
      {!nameSubmitted ? (
        <div className="name-input">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your Name"
          />
          <button onClick={() => setNameSubmitted(true)} disabled={!playerName.trim()}>
            Start Quiz
          </button>
        </div>
      ) : showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>{playerName}, your Score: {score} / {shuffledQuestions.length}</p>
          <p className="result-message">
            {score >= 8
              ? "You are well-trained in fire extinguisher usage! recommended more training from Mr.Worldwide."
              : score >= 5
              ? "You have basic knowledge, but recommended more training from Mr.Worldwide.."
              : "You need to improve your knowledge. recommended more training from Mr.Worldwide."}
          </p>
          <button onClick={restartGame} className="restart-btn">Play Again</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Welcome, {playerName}!</h2>
          <h2>Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</h2>
          <h3>{shuffledQuestions[currentQuestionIndex].question}</h3>
          <div className="answer-buttons">
            <button 
              onClick={() => handleAnswer(true)} 
              className={`answer-btn ${selectedAnswer === true ? (shuffledQuestions[currentQuestionIndex].answer ? "correct" : "wrong") : ""}`}>
              Yes
            </button>
            <button 
              onClick={() => handleAnswer(false)} 
              className={`answer-btn ${selectedAnswer === false ? (shuffledQuestions[currentQuestionIndex].answer ? "correct" : "wrong") : ""}`}>
              No
            </button>
          </div>
          <p className="progress">Progress: {currentQuestionIndex + 1} / {shuffledQuestions.length}</p>
        </div>
      )}
    </div>
  );
};

export default FireExtinguisherQuiz;

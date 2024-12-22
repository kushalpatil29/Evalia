import React, { useState } from 'react';

const QuizApp = () => {
  const questionBank = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "White Rhinoceros"],
      correctAnswer: "Blue Whale"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: "Au"
    }
  ];

  const [questions] = useState(() => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = (questionIndex, answer) => {
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: answer
      }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < 3) {
      alert("Please answer all questions before submitting!");
      return;
    }

    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen quiz-background font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {/* Quiz Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Challenge</h1>
            <p className="text-gray-600">Answer all questions to complete the quiz</p>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mb-8 space-x-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all ${
                  currentQuestion === index 
                    ? 'bg-blue-600 ring-4 ring-blue-200' 
                    : answers[index] 
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {!submitted ? (
            <div className="space-y-6">
              {/* Question */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuestion, option)}
                      className={`p-4 rounded-lg cursor-pointer transition-all
                        ${answers[currentQuestion] === option 
                          ? 'bg-blue-50 border-2 border-blue-400' 
                          : 'border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50'
                        }`}
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          checked={answers[currentQuestion] === option}
                          onChange={() => handleAnswerSelect(currentQuestion, option)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-2 rounded-lg transition-colors
                    ${currentQuestion === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                    }`}
                >
                  Previous
                </button>
                
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < 3}
                    className={`px-6 py-2 rounded-lg transition-colors
                      ${Object.keys(answers).length < 3
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className={`px-6 py-2 rounded-lg transition-colors
                      ${!answers[currentQuestion]
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-600">
                  You scored {score} out of {questions.length}
                </p>
              </div>

              {/* Results Details */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <span className={answers[index] === question.correctAnswer 
                        ? 'text-green-500 text-xl' 
                        : 'text-red-500 text-xl'
                      }>
                        {answers[index] === question.correctAnswer ? '✓' : '✗'}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{question.question}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Your answer: <span className={answers[index] === question.correctAnswer 
                            ? 'text-green-600 font-medium' 
                            : 'text-red-600 font-medium'
                          }>
                            {answers[index]}
                          </span>
                        </p>
                        {answers[index] !== question.correctAnswer && (
                          <p className="text-sm text-gray-600">
                            Correct answer: <span className="text-green-600 font-medium">
                              {question.correctAnswer}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
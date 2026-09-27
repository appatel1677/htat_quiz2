'use client';
import React, { useState } from 'react';
import { quizCategories } from '../data/quizData';

export default function QuizApp() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; // Prevent changing option once selected
    setSelectedOption(index);

    const isCorrect = index === selectedCategory.questions[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: selectedCategory.questions[currentQuestionIndex].id,
        userSelection: index,
        correctIndex: selectedCategory.questions[currentQuestionIndex].correctIndex,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < selectedCategory.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-gray-800">
      <header className="max-w-4xl mx-auto mb-8 text-center bg-indigo-700 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">📚 HTAT Quiz Master App(palaj)</h1>
        <p className="text-indigo-200 mt-2">મુખ્ય શિક્ષક અને બાળ સંરક્ષણ કાયદાઓની તૈયારી માટે ઓનલાઇન ટેસ્ટ</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Category Selection Screen */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="bg-white p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-indigo-500 cursor-pointer transition transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-bold text-indigo-900 mb-2">{cat.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-full font-semibold">
                  કુલ પ્રશ્નો: {cat.questions.length}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quiz Question Screen */}
        {selectedCategory && !showResult && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <span className="text-sm font-bold text-gray-500">
                પ્રશ્ન {currentQuestionIndex + 1} / {selectedCategory.questions.length}
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs font-bold text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded-lg"
              >
                ✕ બહાર નીકળો
              </button>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
              {selectedCategory.questions[currentQuestionIndex].question}
            </h2>

            <div className="space-y-3 mb-8">
              {selectedCategory.questions[currentQuestionIndex].options.map((opt, idx) => {
                let btnStyle = "bg-gray-50 border-gray-300 hover:bg-indigo-50 text-gray-800";
                
                if (selectedOption !== null) {
                  if (idx === selectedCategory.questions[currentQuestionIndex].correctIndex) {
                    btnStyle = "bg-green-100 border-green-500 text-green-900 font-bold";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-red-100 border-red-500 text-red-900 font-bold";
                  } else {
                    btnStyle = "bg-gray-50 border-gray-200 text-gray-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition font-medium ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition"
              >
                {currentQuestionIndex + 1 === selectedCategory.questions.length ? "પરિણામ જુઓ" : "આગળનો પ્રશ્ન ➔"}
              </button>
            )}
          </div>
        )}

        {/* Result Screen */}
        {showResult && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-200">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-2">🎉 કસોટી પૂર્ણ થઈ!</h2>
            <p className="text-gray-600 mb-6">{selectedCategory.title}</p>

            <div className="bg-indigo-50 p-6 rounded-2xl inline-block mb-8 border border-indigo-100">
              <span className="text-sm font-bold text-indigo-700 uppercase tracking-wider block mb-1">તમારો સ્કોર</span>
              <span className="text-5xl font-black text-indigo-900">
                {score} / {selectedCategory.questions.length}
              </span>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleSelectCategory(selectedCategory)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition"
              >
                🔄 ફરીથી પ્રયત્ન કરો
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition"
              >
                📋 મુખ્ય મેનુ
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
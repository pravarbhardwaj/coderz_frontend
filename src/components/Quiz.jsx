import React, { useState } from "react";



const Quiz = ({quizData}) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionSelect = (optionKey) => {
    if (currentQuestion.multiselect) {
      setSelectedAnswers((prev) => {
        const selectedSet = new Set(prev[currentQuestion.id] || []);
        selectedSet.has(optionKey) ? selectedSet.delete(optionKey) : selectedSet.add(optionKey);
        return { ...prev, [currentQuestion.id]: Array.from(selectedSet) };
      });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: [optionKey] });
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
     
      alert("Quiz Completed!");

      if (localStorage.getItem("role") == "Teacher")
      {
        return
      }

      console.log("selectedAnswers -- ", selectedAnswers)
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };


  
  return (
    <div className="flex flex-col bg-gray-100 p-6 w-full">
       { localStorage.getItem("role") == "Teacher" && <button
        className="mb-4 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
        onClick={handleRestart}
    >Restart</button>}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <div
              key={key}
              className={`cursor-pointer p-4 border rounded-lg transition ${
                selectedAnswers[currentQuestion.id]?.includes(key)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleOptionSelect(key)}
            >
              {value}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            onClick={handleNext}
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

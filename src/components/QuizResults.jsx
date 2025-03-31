import React from "react";

const QuizResults = ({ quizData }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
      {quizData.map((item, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium mb-2">{item.question}</h3>
          <div className="grid grid-cols-2 gap-2">
            {item.all_options.map((option, idx) => {
              const isSelected = item.selected_options.includes(option.value);
              const isCorrect = item.correct_answers.includes(option.value);
              return (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-lg font-medium text-white text-center ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {option.value}
                </span>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Correct answer(s): {item.correct_answers.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuizResults;

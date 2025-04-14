import React from "react";

const SubmittedQuizAnswers = ({ submittedQuizzes, }) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 w-full">
      {submittedQuizzes.map((quiz) => (
        <div
          key={quiz.quiz_id}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold mb-4">{quiz.question}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quiz.all_options.map((option) => {
              const isSelected = quiz.selected_options.includes(option.value);
              const isCorrect = quiz.correct_answers.includes(option.value);

              let bgClass = "bg-gray-100";
              if (isSelected && isCorrect) bgClass = "bg-green-500 text-white";
              else if (isSelected && !isCorrect) bgClass = "bg-red-500 text-white";
              else if (isCorrect) bgClass = "bg-green-100";

              return (
                <div
                  key={option.index}
                  className={`p-4 border rounded-lg ${bgClass}`}
                >
                  {option.value}
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <span className="font-medium">Correct Answer(s): </span>
            {quiz.correct_answers.join(", ")}
          </div>
          <div className="mt-1 text-sm">
            <span className="font-medium">Your Answer: </span>
            {quiz.selected_options.join(", ")}{" "}
            {quiz.is_correct ? (
              <span className="text-green-600">(Correct)</span>
            ) : (
              <span className="text-red-600">(Incorrect)</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmittedQuizAnswers;

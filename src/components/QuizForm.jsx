import { useState } from "react";
import axios from "axios";
import React from "react";
import { postAPI } from "../request/APIManager";

const QuizForm = ({ navigation, data, getAdminProjects }) => {
  const [quizzes, setQuizzes] = useState(data.quizzes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionChange = (index, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index].question = value;
    setQuizzes(updatedQuizzes);
  };

  const handleOptionChange = (qIndex, key, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[qIndex].options[key] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleAnswerChange = (qIndex, optionKey) => {
    const updatedQuizzes = [...quizzes];
    const answers = updatedQuizzes[qIndex].answers;

    if (updatedQuizzes[qIndex].multiselect) {
      if (answers.includes(optionKey)) {
        updatedQuizzes[qIndex].answers = answers.filter((a) => a !== optionKey);
      } else {
        updatedQuizzes[qIndex].answers = [...answers, optionKey];
      }
    } else {
      updatedQuizzes[qIndex].answers = [optionKey];
    }

    setQuizzes(updatedQuizzes);
  };

  const handleMultiselectChange = (index, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index].multiselect = value;
    setQuizzes(updatedQuizzes);
  };

  const addQuestion = () => {
    setQuizzes([
      ...quizzes,
      {
        question: "",
        options: { 1: "", 2: "", 3: "",  4: "" },
        answers: [],
        multiselect: false,
      },
    ]);
  };

  const removeQuestion = (index) => {
    setQuizzes(quizzes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const pl = { quizzes };

    const payload = {'quizzes' : pl.quizzes.map(({ id, ...rest }) => rest)};
    try {
      const response = await postAPI(
        navigation,
        `/projects/classroom-projects/${data.id}/quizzes/`,
        payload
      );
      alert("Quiz submitted successfully!");

      getAdminProjects();
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Quiz Form</h2>

      {quizzes.map((quiz, qIndex) => (
        <div key={qIndex} className="border p-4 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Enter question"
            value={quiz.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />

          <div className="mb-2">
            <label className="text-sm font-semibold">Options:</label>
            {Object.keys(quiz.options).map((key) => (
              <div key={key} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={quiz.options[key]}
                  onChange={(e) =>
                    handleOptionChange(qIndex, key, e.target.value)
                  }
                  placeholder={`Option ${key}`}
                  className="border rounded p-1 flex-1"
                />
                <input
                  type={quiz.multiselect ? "checkbox" : "radio"}
                  name={`question-${qIndex}`}
                  checked={quiz.answers.includes(parseInt(key))}
                  onChange={() => handleAnswerChange(qIndex, parseInt(key))}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Multi-select:</label>
            <input
              type="checkbox"
              checked={quiz.multiselect}
              onChange={(e) =>
                handleMultiselectChange(qIndex, e.target.checked)
              }
            />
          </div>

          <button
            onClick={() => removeQuestion(qIndex)}
            className="text-red-500 mt-2 text-sm"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white p-2 rounded-lg mt-4"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded-lg mt-4 ml-2"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default QuizForm;

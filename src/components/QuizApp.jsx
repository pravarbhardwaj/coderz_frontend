// QuizApp.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    () => JSON.parse(localStorage.getItem("quiz-answers")) || {}
  );
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testDuration: 0,
    testCode: "",
    contentId: "",
    questId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.questplus.in/api/get-test-question/?qCId=${id}`
        );

        const data = response.data?.data;
        if (data && Array.isArray(data.questions)) {
          setQuestions(data.questions);
          setTestInfo({
            testName: data.testName,
            testDuration: parseInt(data.testDuration || 0),
            testCode: data.testId,
            contentId: id,
            questId: data.questId,
          });
          setTimeLeft(parseInt(data.testDuration || 0) * 60);
        } else {
          throw new Error("Invalid question format");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        attemptedAnswer: optionId,
        visited: 1,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
      },
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      userId: localStorage.getItem("user_id"),
      questId: testInfo.questId,
      contentId: testInfo.contentId,
      testCode: testInfo.testCode,
      attemptedDate: new Date().toISOString(),
      attemptDuration: testInfo.testDuration * 60 - timeLeft,
      question: questions.map((q) => ({
        missionQuestionId: q.missionQuestionId,
        visited: answers[q.missionQuestionId]?.visited ? "1" : "0",
        attemptedAnswer: answers[q.missionQuestionId]?.attemptedAnswer || "",
        questionMarks: q.correctMark?.toString() || "1",
        timeTaken: answers[q.missionQuestionId]?.timeTaken || 0,
      })),
    };

    try {
      const response = await axios.post(
        "https://apiv2.questplus.in/api/send-test-attempt/",
        payload
      );
      localStorage.removeItem("quiz-answers");
      navigate(
        "/quiz-result/" + response.data.data.latestAttemptOnlineAssignmentId
      );
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit quiz.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{testInfo.testName}</h1>
        <div className="text-lg font-mono">⏱ {formatTime(timeLeft)}</div>
      </div>

      <div className="border p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">
          Q{currentIndex + 1}:{" "}
          <span
            dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}
          />
        </h2>
        <ul className="space-y-2">
          {currentQuestion.options.map((option) => (
            <li key={option.id}>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${currentQuestion.missionQuestionId}`}
                  value={option.id}
                  checked={
                    answers[currentQuestion.missionQuestionId]
                      ?.attemptedAnswer === option.id
                  }
                  onChange={() =>
                    handleOptionSelect(
                      currentQuestion.missionQuestionId,
                      option.id
                    )
                  }
                />
                <span dangerouslySetInnerHTML={{ __html: option.value }} />
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          Back
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-8 h-8 rounded-full text-white text-sm font-bold ${
              answers[questions[i].missionQuestionId]?.attemptedAnswer
                ? "bg-green-500"
                : i === currentIndex
                ? "bg-blue-500"
                : "bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizApp;

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
  const [testInfo, setTestInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loader, setLoader] = useState(false)

  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `https://apiv2.questplus.in/api/get-test-question/?qCId=${id}`
        );
        const data = res.data?.data;
        if (data?.questions) {
          setQuestions(data.questions);
          setTestInfo({
            testName: data.testName,
            testDuration: parseInt(data.testDuration || 0),
            testCode: data.testId,
            contentId: data.contentId,
            questId: data.questId,
          });

          const durationInSec = parseInt(data.testDuration) * 60;
          const savedStart = localStorage.getItem("quiz-start-time");
          let elapsed = 0;

          if (savedStart) {
            elapsed = Math.floor((Date.now() - parseInt(savedStart)) / 1000);
          } else {
            localStorage.setItem("quiz-start-time", Date.now().toString());
          }

          const remaining = durationInSec - elapsed;
          setTimeLeft(remaining > 0 ? remaining : 0);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        setError("Failed to load quiz.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
  }, [answers]);

  // Handle option select
  const handleOptionSelect = (questionId, optionId) => {
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        attemptedAnswer: optionId,
        visited: 1,
        timeTaken: (prev[questionId]?.timeTaken || 0) + timeSpent,
      },
    }));
    startTimeRef.current = Date.now(); // Reset timer for next question
  };

  // Track time when switching question
  const handleQuestionSwitch = (newIndex) => {
    const currentQ = questions[currentIndex];
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    if (currentQ) {
      setAnswers((prev) => ({
        ...prev,
        [currentQ.missionQuestionId]: {
          ...prev[currentQ.missionQuestionId],
          visited: 1,
          timeTaken:
            (prev[currentQ.missionQuestionId]?.timeTaken || 0) + timeSpent,
        },
      }));
    }
    setCurrentIndex(newIndex);
    startTimeRef.current = Date.now();
  };

  const handleSubmit = async () => {
    setLoader(true)
    setShowConfirm(false);
    localStorage.removeItem("quiz-start-time");

    const payload = {
      userId: localStorage.getItem("user_id"),
      questId: testInfo.questId,
      contentId: testInfo.contentId,
      testCode: testInfo.testCode,
      attemptedDate: new Date().toISOString(),
      attemptDuration: (testInfo.testDuration || 0) * 60 - timeLeft,
      question: questions.map((q) => ({
        missionQuestionId: q.missionQuestionId,
        visited: answers[q.missionQuestionId]?.visited ? "1" : "0",
        attemptedAnswer: answers[q.missionQuestionId]?.attemptedAnswer || "",
        questionMarks: q.correctMark?.toString() || "1",
        timeTaken: answers[q.missionQuestionId]?.timeTaken || 0,
      })),
    };

    try {
    
      const res = await axios.post(
        "https://apiv2.questplus.in/api/send-test-attempt/",
        payload
      );
      localStorage.removeItem("quiz-answers");
      navigate("/quiz-result/" + res.data.data.latestAttemptOnlineAssignmentId);
    } catch (err) {
      setLoader(false)
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const currentQuestion = questions[currentIndex];

  if (loading) return <div className="p-4">Loading...</div>;
  if (loader) return <div className="p-4">Submitting Quiz...</div>;

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{testInfo.testName}</h1>
        <div className="text-lg font-mono">⏱ {formatTime(timeLeft)}</div>
      </div>

      {/* Navigation Grid */}
      <div className="mt-4 flex flex-wrap gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => handleQuestionSwitch(i)}
            className={`w-8 h-8 rounded-full text-sm font-bold text-white ${
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

      {/* Question */}
      <div className="border p-4 rounded-lg shadow mt-6">
        <h2 className="font-semibold mb-2">
          Q{currentIndex + 1}:{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: currentQuestion.questionText,
            }}
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

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={currentIndex === 0}
          onClick={() => handleQuestionSwitch(currentIndex - 1)}
        >
          Back
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowConfirm(true)}
        >
          Submit Quiz
        </button>
        <div className="flex gap-2">
          {currentIndex < questions.length - 1 && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleQuestionSwitch(currentIndex + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Submit Quiz?</h2>
            <p className="mb-6">
              Are you sure you want to submit the quiz? You won’t be able to
              change your answers after this.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleSubmit}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;

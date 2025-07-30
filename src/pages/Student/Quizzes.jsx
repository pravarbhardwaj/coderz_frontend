import axios from "axios";
import PdfSwiperModal from "../../components/PdfSwiperModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Quizzes = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);



  const [data, setData] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setLoading(true);
    axios
      .get(
        `https://apiv2.questplus.in/api/get-content-by-user/?user_id=${userId}`
      )
      .then((res) => {
        const sortedData = [...res.data.data].sort((a, b) =>
          a.missionId.localeCompare(b.missionId)
        );
        setData(sortedData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError("Failed to fetch content.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const cleanTitle = (title = "") => title.replace(/-MCQ$/i, "").trim();
  const quizzes = data.filter((item) => item.contentTypeCode === "08");


  return (
    <div className="p-6 max-w-5xl mx-auto">
     {selectedQuiz && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-2">
                      {cleanTitle(selectedQuiz.contentName)}
                    </h2>
                    {selectedQuiz.description &&
                      selectedQuiz.description !== selectedQuiz.contentName && (
                        <p className="text-gray-600 mb-4">
                          {selectedQuiz.description}
                        </p>
                      )}
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                        onClick={() => setSelectedQuiz(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          localStorage.removeItem("quiz-answers");
                          navigate(`/quizapp/${selectedQuiz.qcId}`, {
                            state: { quiz: selectedQuiz },
                          });
                          setSelectedQuiz(null);
                        }}
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : quizzes.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-2xl">
                  No quizzes found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.qcId}
                      className="border p-4 rounded-lg shadow bg-yellow-50 cursor-pointer hover:bg-yellow-100"
                      onClick={() => setSelectedQuiz(quiz)}
                    >
                      <h3 className="text-lg font-semibold">
                        {cleanTitle(quiz.contentName)}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
      </div>
    </div>
  );
}

export default Quizzes;

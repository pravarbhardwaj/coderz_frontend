import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
// import DearFlipModal from "../components/DearFlipModal";
import PdfFlipbookModal from "../components/PdfFlipbookModal";

const Content = () => {
  const [activeTab, setActiveTab] = useState("pdfs");
  const [data, setData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://apiv2.questplus.in/api/get-content-by-user/?user_id=f5fd054c-e0a6-45d2-bf68-9c435dd47f16"
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
      });
  }, []);

  const pdfs = data.filter((item) => item.contentTypeCode === "04");
  const quizzes = data.filter((item) => item.contentTypeCode === "08");

  const cleanTitle = (title = "") => title.replace(/-MCQ$/i, "").trim();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PdfFlipbookModal
        isOpen={open}
        onClose={() => setOpen(false)}
        pdfUrl={selectedPdf}
      />
      <div className="flex space-x-4 border-b border-gray-200 mb-4">
        <button
          onClick={() => {
            setActiveTab("pdfs");
            setSelectedPdf(null);
            setOpen(false);
            setSelectedQuiz(null);
          }}
          className={classNames(
            "py-2 px-4 text-sm font-medium",
            activeTab === "pdfs"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          )}
        >
          PDFs
        </button>
        <button
          onClick={() => {
            setActiveTab("quizzes");
            setSelectedPdf(null);
            setSelectedQuiz(null);
            setOpen(false);
          }}
          className={classNames(
            "py-2 px-4 text-sm font-medium",
            activeTab === "quizzes"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          )}
        >
          Quiz
        </button>
      </div>

      {activeTab === "pdfs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pdfs.map((pdf) => (
            <div
              key={pdf.qcId}
              className="border p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedPdf(pdf.fileUrl);
                setOpen(true);
              }}
            >
              <h3 className="text-lg font-semibold">{pdf.contentName}</h3>
              <p className="text-sm text-gray-500">
                {pdf.operationDisplayName}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "quizzes" && (
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

      {selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">
              {cleanTitle(selectedQuiz.contentName)}
            </h2>
            {selectedQuiz.description &&
              selectedQuiz.description !== selectedQuiz.contentName && (
                <p className="text-gray-600 mb-4">{selectedQuiz.description}</p>
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
    </div>
  );
};

export default Content;

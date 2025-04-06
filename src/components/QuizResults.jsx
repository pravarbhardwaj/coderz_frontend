import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://apiv2.questplus.in/api/mission-test-results/${id}/`);
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const result = res.data[0];
          if (Array.isArray(result.testQuestion)) {
            const transformed = result.testQuestion.map((q) => ({
              question: q.questionText,
              all_options: q.options,
              selected_option: q.userAnswer,
              correct_answer: q.answer,
            }));
            setQuizData(transformed);
            setSummary({
              totalQuestions: result.totalQuestion,
              totalMarks: result.totalMarks,
              marksObtained: result.marksObtained,
              rightCount: result.rightCount,
              wrongCount: result.wrongCount,
              percentage: result.percentage,
              attemptedDate: result.attemptedDate,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleGoHome = () => navigate('/content');

  const chartData = summary
    ? [
        {
          name: 'Answers',
          Correct: summary.rightCount,
          Incorrect: summary.wrongCount,
        },
        {
          name: 'Marks',
          Obtained: summary.marksObtained,
          Total: summary.totalMarks,
        },
      ]
    : [];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Result</h1>

      {summary && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Total Questions:</strong> {summary.totalQuestions}</p>
            <p><strong>Total Marks:</strong> {summary.totalMarks}</p>
            <p><strong>Marks Obtained:</strong> {summary.marksObtained}</p>
            <p><strong>Correct Answers:</strong> {summary.rightCount}</p>
            <p><strong>Incorrect Answers:</strong> {summary.wrongCount}</p>
            <p><strong>Percentage:</strong> {summary.percentage}%</p>
            <p><strong>Attempted Date:</strong> {new Date(summary.attemptedDate).toLocaleDateString()}</p>
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barGap={16}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correct" fill="#4ade80" />
                <Bar dataKey="Incorrect" fill="#f87171" />
                <Bar dataKey="Obtained" fill="#60a5fa" />
                <Bar dataKey="Total" fill="#cbd5e1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Show Summary
        </button>
        <button
          onClick={handleGoHome}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>

      {/* Modal remains unchanged */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold">Quiz Summary</h3>
              <button onClick={handleCloseModal} className="text-gray-500 text-2xl">&times;</button>
            </div>
            <div className="mt-4">
              {quizData.map((item, index) => (
                <div key={index} className="mt-4">
                  <p className="font-semibold">{parse(item.question)}</p>
                  <ul>
                    {item.all_options.map((option) => (
                      <li
                        key={option.id}
                        className={`px-4 py-2 border rounded-md mt-2 ${
                          item.selected_option === option.id
                            ? item.correct_answer === option.id
                              ? 'bg-green-200'
                              : 'bg-red-200'
                            : item.correct_answer === option.id
                            ? 'bg-green-100'
                            : ''
                        }`}
                      >
                        {parse(option.value)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;

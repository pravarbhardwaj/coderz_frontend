import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getAPI } from '../../request/APIManager';
import Loading from '../../components/Loading';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({
    total_projects_assigned: 0,
    total_projects_uploaded: 0,
    total_projects_reviewed: 0,
    average_session_duration_minutes: 0,
    pdf_notes_accessed: 0,
    quizzes_attempted: 0,
    group_details: [],
  });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);

  useEffect(() => {
    chartsApi();
  }, []);

  const chartsApi = async () => {
    try {
      const response = await getAPI(null, 'dashboards/');
      setApiData({
        total_projects_assigned: response.total_projects_assigned || 0,
        total_projects_uploaded: response.total_projects_uploaded || 0,
        total_projects_reviewed: response.total_projects_reviewed || 0,
        average_session_duration_minutes: response.average_session_duration_minutes || 0,
        pdf_notes_accessed: response.pdf_notes_accessed || 0,
        quizzes_attempted: response.quizzes_attempted || 0,
        group_details: response.group_details || [],
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async (grade) => {
    setStudentLoading(true);
    try {
      setSelectedGroup(grade);

      const res = await getAPI(null, `dashboards/students-project-report/?group_id=${grade}`);
      setStudentData(res?.report || []);
     
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setStudentLoading(false);
    }
  };

  const {
    total_projects_assigned,
    total_projects_uploaded,
    total_projects_reviewed,
    average_session_duration_minutes,
    pdf_notes_accessed,
    quizzes_attempted,
    group_details,
  } = apiData;

  const hasValidProjectData =
    total_projects_assigned > 0 ||
    total_projects_uploaded > 0 ||
    total_projects_reviewed > 0;

  const projectsData = {
    labels: ['Projects Assigned', 'Projects Uploaded', 'Projects Reviewed'],
    datasets: [
      {
        label: 'Projects',
        data: hasValidProjectData
          ? [
              total_projects_assigned,
              total_projects_uploaded,
              total_projects_reviewed,
            ]
          : [5, 3, 2],
        backgroundColor: ['#4A90E2', '#F5A623', '#D1D1D1'],
        borderWidth: 1,
      },
    ],
  };

  const projectsOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const timeData = {
    labels: ['Average Session Duration Minutes'],
    datasets: [
      {
        label: 'Time (min)',
        data: [average_session_duration_minutes || 50],
        backgroundColor: ['#4AB2F1'],
        borderWidth: 1,
      },
    ],
  };

  const timeOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const learnChartData = {
    labels: ['PDF Notes Accessed', 'Quizzes Attempted'],
    datasets: [
      {
        label: 'Activity Count',
        data: [pdf_notes_accessed, quizzes_attempted],
        backgroundColor: ['#4A90E2', '#F5A623'],
      },
    ],
  };

  const learnChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) return <Loading />

  return (
    <div className="p-6">
      {/* Charts Section */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="w-full md:w-[300px] bg-white shadow-md rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Learn Summary</h4>
          <div className="h-48">
            <Bar data={learnChartData} options={learnChartOptions} />
          </div>
        </div>

        <div className="w-full md:w-[300px] bg-white shadow-md rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Projects Summary</h4>
          <Doughnut data={projectsData} options={projectsOptions} />
        </div>

        <div className="w-full md:w-[300px] bg-white shadow-md rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Total Time Spent</h4>
          <Doughnut data={timeData} options={timeOptions} />
        </div>
      </div>

      {/* Group-wise Summary Table */}
      <div>
        <h4 className="text-xl font-bold mb-4">Group-wise Project Summary</h4>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-center border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
              <tr>
                <th className="px-4 py-3 border">Grade</th>
                <th className="px-4 py-3 border">Total Students</th>
                <th className="px-4 py-3 border">Projects Assigned</th>
                <th className="px-4 py-3 border">Projects Submitted</th>
                <th className="px-4 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {group_details?.length > 0 ? (
                group_details.map((group, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 border">{group.grade?.trim() || 'N/A'}</td>
                    <td className="px-4 py-2 border">{group.total_students || 0}</td>
                    <td className="px-4 py-2 border">{group.projects_assigned || 0}</td>
                    <td className="px-4 py-2 border">{group.projects_submitted || 0}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => fetchStudentData(group.group_id)}
                        className="text-blue-600 hover:underline"
                      >
                        View Student wise details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-gray-500">
                    No group data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student-wise Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">Student-wise Report - Grade {selectedGroup}</h4>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  setSelectedGroup(null);
                  setStudentData([]);
                }}
              >
                Close
              </button>
            </div>
            {studentLoading ? (
              <Loading />
            ) : (
              <div className="overflow-x-auto max-h-[400px]">
                <table className="min-w-full text-sm text-center border border-gray-200">
                  <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
                    <tr>
                      <th className="px-4 py-3 border">Student Name</th>
                      <th className="px-4 py-3 border">Projects Assigned</th>
                      <th className="px-4 py-3 border">Projects Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.length > 0 ? (
                      studentData.map((student, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2 border">{student.student_name || 'N/A'}</td>
                          <td className="px-4 py-2 border">{student.projects_assigned || 0}</td>
                          <td className="px-4 py-2 border">{student.projects_submitted || 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-4 py-4 text-gray-500">
                          No student data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
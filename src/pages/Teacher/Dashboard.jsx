import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAPI } from '../../request/APIManager';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({
    total_projects_assigned: 0,
    total_projects_uploaded: 0,
    total_projects_reviewed: 0,
    average_session_duration_minutes: 0,
    group_details: [],
  });

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
        average_session_duration_minutes:
          response.average_session_duration_minutes || 50,
        group_details: response.group_details || [],
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const {
    total_projects_assigned,
    total_projects_uploaded,
    total_projects_reviewed,
    average_session_duration_minutes,
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

  if (loading) return <p className="p-4 text-gray-600">Loading dashboard data...</p>;

  return (
    <div className="p-6">
      {/* Charts Section */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="w-full md:w-[300px] bg-white shadow-md rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Learn Summary</h4>
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
            <span className="text-gray-500">Coming Soon</span>
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
                    <td className="px-4 py-2 border">{group.grade || 'N/A'}</td>
                    <td className="px-4 py-2 border">{group.total_students || 0}</td>
                    <td className="px-4 py-2 border">{group.projects_assigned || 0}</td>
                    <td className="px-4 py-2 border">{group.projects_submitted || 0}</td>
                    <td className="px-4 py-2 border">
                      <a
                        href={`/student-details/${group.grade}`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Student wise details
                      </a>
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
    </div>
  );
};

export default Dashboard;

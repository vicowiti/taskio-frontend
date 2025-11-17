import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTasks,
} from "react-icons/fa";

const Dash = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: 24,
      icon: <FaTasks className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Pending Tasks",
      value: 12,
      icon: <FaClock className="w-6 h-6" />,
      color: "yellow",
    },
    {
      title: "Completed Tasks",
      value: 10,
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Overdue Tasks",
      value: 2,
      icon: <FaExclamationCircle className="w-6 h-6" />,
      color: "red",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Design new landing page",
      status: "pending",
      priority: "high",
      dueDate: "2025-11-20",
    },
    {
      id: 2,
      title: "Update user documentation",
      status: "completed",
      priority: "medium",
      dueDate: "2025-11-18",
    },
    {
      id: 3,
      title: "Fix responsive issues",
      status: "overdue",
      priority: "high",
      dueDate: "2025-11-15",
    },
    {
      id: 4,
      title: "Team meeting preparation",
      status: "pending",
      priority: "low",
      dueDate: "2025-11-22",
    },
    {
      id: 5,
      title: "Code review for PR #234",
      status: "pending",
      priority: "medium",
      dueDate: "2025-11-19",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getCardBgColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "yellow":
        return "bg-yellow-50 text-yellow-600";
      case "green":
        return "bg-green-50 text-green-600";
      case "red":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Task Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${getCardBgColor(stat.color)} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Tasks
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                      <span
                        className={`text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority} priority
                      </span>
                      <span className="text-gray-500 text-xs">
                        Due: {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <button className="self-start sm:self-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;

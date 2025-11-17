import React, { useState } from "react";
import { FaUser, FaPlus, FaTasks, FaUserPlus } from "react-icons/fa";

const MyTeam = () => {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager",
      email: "sarah.j@company.com",
      tasksAssigned: 8,
      tasksCompleted: 5,
      avatarColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Developer",
      email: "michael.c@company.com",
      tasksAssigned: 12,
      tasksCompleted: 9,
      avatarColor: "bg-green-500",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UI/UX Designer",
      email: "emily.r@company.com",
      tasksAssigned: 6,
      tasksCompleted: 4,
      avatarColor: "bg-purple-500",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Frontend Developer",
      email: "david.k@company.com",
      tasksAssigned: 10,
      tasksCompleted: 7,
      avatarColor: "bg-yellow-500",
    },
    {
      id: 5,
      name: "Jessica Brown",
      role: "Backend Developer",
      email: "jessica.b@company.com",
      tasksAssigned: 9,
      tasksCompleted: 6,
      avatarColor: "bg-red-500",
    },
    {
      id: 6,
      name: "Alex Martinez",
      role: "QA Engineer",
      email: "alex.m@company.com",
      tasksAssigned: 7,
      tasksCompleted: 5,
      avatarColor: "bg-indigo-500",
    },
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAssignTask = (member) => {
    setSelectedMember(member);
    setShowAssignModal(true);
  };

  const handleViewTasks = (member) => {
    console.log("View tasks for:", member.name);
    // This would navigate to tasks view or open a modal
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Team</h1>
            <p className="text-gray-500 mt-1">
              {teamMembers.length} team members
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow-sm">
            <FaUserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              {/* Avatar and Info */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`${member.avatarColor} rounded-full p-4 flex items-center justify-center`}
                >
                  <FaUser className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Task Stats */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Tasks Assigned</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {member.tasksAssigned}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="text-sm font-semibold text-green-600">
                    {member.tasksCompleted}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (member.tasksCompleted / member.tasksAssigned) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {Math.round(
                      (member.tasksCompleted / member.tasksAssigned) * 100
                    )}
                    % complete
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAssignTask(member)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  <FaPlus className="w-3 h-3" />
                  Assign Task
                </button>
                <button
                  onClick={() => handleViewTasks(member)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <FaTasks className="w-3 h-3" />
                  View Tasks
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Assign Task Modal */}
        {showAssignModal && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Assign Task
              </h2>
              <p className="text-gray-600 mb-6">
                Assigning task to{" "}
                <span className="font-semibold">{selectedMember.name}</span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows="3"
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeam;

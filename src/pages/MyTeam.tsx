import { useEffect, useState } from "react";
import {
  FaUser,
  FaUserPlus,
  FaEnvelope,
  FaUserTag,
  FaPlus,
  FaTasks,
  FaTrash,
  FaTimes,
  FaCheck,
  FaClock,
} from "react-icons/fa";
import { useAppDispatch, type RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { getData } from "../config/localStorage";
import { addUser, deleteUser, getUsers } from "../redux/slices/users";
import type { Result } from "../types/user";
import { toast } from "sonner";
import { createTask, getUserTasks } from "../redux/slices/tasksSlice";
import Loading from "../components/Loading";

const MyTeam = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Homepage",
      description: "Create mockups for new homepage",
      priority: "high",
      dueDate: "2025-11-25",
      assignedTo: 1,
      status: "in-progress",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Integrate payment gateway",
      priority: "medium",
      dueDate: "2025-11-30",
      assignedTo: 2,
      status: "pending",
    },
  ]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [showViewTasksModal, setShowViewTasksModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Result | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<Result | null>(null);
  const { usersObject } = useSelector((state: RootState) => state.users);
  const { userTasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "MEMBER",
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const user: {
        access: string;
      } = await getData("user");
      await dispatch(getUsers(user.access));
      setLoading(false);
    };

    fetchUsers();
  }, [dispatch]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const user: {
        access: string;
      } = await getData("user");
      await dispatch(
        addUser({
          token: user.access,
          data: { ...newUser, password: "password" },
        })
      );

      toast.success("User added successfully");
      await dispatch(getUsers(user.access));
    } catch (error) {
      console.log(error);
      toast.error("Error adding user");
    }
    setShowAddUserModal(false);
  };

  const handleDeleteUser = async (userId: number) => {
    const user: { access: string } = await getData("user");
    await dispatch(
      deleteUser({
        token: user.access,
        id: userId,
      })
    );

    await dispatch(getUsers(user.access));
    toast.success("User deleted successfully");
    setShowDeleteConfirm(false);
  };

  const confirmDelete = (member: Result) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const handleAssignTask = (member: Result) => {
    setSelectedMember(member);
    setShowAssignTaskModal(true);
  };

  const handleViewTasks = async (member: Result) => {
    const user: { access: string } = await getData("user");
    setSelectedMember(member);

    await dispatch(getUserTasks({ id: member.id, token: user.access }));
    setShowViewTasksModal(true);
  };

  const submitTaskAssignment = async () => {
    if (!newTask.title || !newTask.dueDate) {
      alert("Please fill in task title and due date");
      return;
    }

    try {
      const user: { access: string } = await getData("user");
      await dispatch(
        createTask({
          token: user.access,
          data: {
            deadline: newTask.dueDate,
            description: newTask.description,
            title: newTask.title,
            assignee: selectedMember?.id,
            status: "TODO",
          },
        })
      );
      setShowAssignTaskModal(false);
      toast.success("Task assigned successfully");
    } catch (error) {
      console.log(error);

      toast.error("Could not assign task");
    }

    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    return colors[index % colors.length];
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-red-100 text-red-700";
      case "MANAGER":
        return "bg-purple-100 text-purple-700";
      case "MEMBER":
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Team</h1>
            <p className="text-gray-500 mt-1">
              {usersObject?.results.length} team member
              {usersObject?.results.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow-sm"
          >
            <FaUserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <div>
          {loading && <Loading size="md" message="Fetching Users..." />}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersObject?.results.map((member, index) => {
            return (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Avatar and Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`${getAvatarColor(
                        index
                      )} rounded-full p-4 flex items-center justify-center`}
                    >
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => confirmDelete(member)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete user"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>

                {/* Member Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaEnvelope className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserTag className="w-4 h-4 text-gray-400" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAssignTask(member)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                  >
                    <FaPlus className="w-3 h-3" />
                    Assign
                  </button>
                  <button
                    onClick={() => handleViewTasks(member)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <FaTasks className="w-3 h-3" />
                    Tasks
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {usersObject?.results.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No team members yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first team member
            </p>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              <FaUserPlus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Add New Member
              </h2>
              <p className="text-gray-600 mb-6">
                Add a new team member to your workspace
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="user@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="first_name"
                      value={newUser.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="last_name"
                      value={newUser.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    required
                    value={newUser.role}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUser({
                      username: "",
                      email: "",
                      first_name: "",
                      last_name: "",
                      role: "MEMBER",
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Task Modal */}
        {showAssignTaskModal && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Assign Task
              </h2>
              <p className="text-gray-600 mb-6">
                Assigning task to{" "}
                <span className="font-semibold">
                  {selectedMember.first_name} {selectedMember.last_name}
                </span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleTaskInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={(e) => handleTaskInputChange(e)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleTaskInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAssignTaskModal(false);
                    setNewTask({
                      title: "",
                      description: "",
                      priority: "medium",
                      dueDate: "",
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={submitTaskAssignment}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  Assign Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Tasks Modal */}
        {showViewTasksModal && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Tasks for {selectedMember.first_name}{" "}
                    {selectedMember.last_name}
                  </h2>
                  <p className="text-gray-600">
                    {userTasks.length} task(s) assigned
                  </p>
                </div>
                <button
                  onClick={() => setShowViewTasksModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {userTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <FaTasks className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No tasks assigned yet</p>
                  </div>
                ) : (
                  userTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {task.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1">
                              <FaClock className="w-3 h-3" />
                              {task.deadline}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                          title="Delete task"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateTaskStatus(task.id, "pending")}
                          className={`flex-1 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            task.status === "TODO"
                              ? "bg-gray-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() =>
                            updateTaskStatus(task.id, "in-progress")
                          }
                          className={`flex-1 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            task.status === "IN_PROGRESS"
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateTaskStatus(task.id, "completed")}
                          className={`flex-1 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            task.status === "DONE"
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <FaCheck className="w-3 h-3 inline mr-1" />
                          Complete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowViewTasksModal(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && memberToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaTrash className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Delete Team Member
                </h2>
              </div>

              <p className="text-gray-600 mb-2">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {memberToDelete.first_name} {memberToDelete.last_name}
                </span>
                ?
              </p>
              <p className="text-sm text-red-600 mb-6">
                This will also delete all tasks assigned to this member. This
                action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setMemberToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(memberToDelete.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-150"
                >
                  Delete
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

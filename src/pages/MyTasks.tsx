import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAppDispatch, type RootState } from "../redux/store/store";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../redux/slices/tasksSlice";
import { getData } from "../config/localStorage";
import { toast } from "sonner";
import { useSelector } from "react-redux";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

const MyTasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "TODO",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const user: {
          access: string;
        } = await getData("user");
        await dispatch(getTasks(user.access));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleCreateTask = async () => {
    if (newTask.title && newTask.dueDate) {
      try {
        const user: {
          access: string;
        } = await getData("user");
        const response = await dispatch(
          createTask({
            data: {
              title: newTask.title,
              description: newTask.description,
              deadline: new Date(newTask.dueDate).toISOString(),
              status: newTask.status,
            },
            token: user.access,
          })
        );

        if (response.type === "tasks/createTask/fulfilled") {
          toast.success("Task Created.");
          setShowModal(false);
          setNewTask({
            title: "",
            description: "",
            dueDate: "",
            status: "TODO",
          });
          await dispatch(getTasks(user.access));
        }
      } catch (error) {
        console.log(error);
        toast.error("Task not created!");
      }
    }
  };

  const handleEditTask = async () => {
    if (selectedTask && newTask.title && newTask.dueDate) {
      try {
        const user: {
          access: string;
        } = await getData("user");
        const response = await dispatch(
          updateTask({
            id: selectedTask.id,
            data: {
              title: newTask.title,
              description: newTask.description,
              deadline: new Date(newTask.dueDate).toISOString(),
              status: newTask.status,
            },
            token: user.access,
          })
        );

        if (response.type === "tasks/updateTask/fulfilled") {
          toast.success("Task Updated.");
          setShowModal(false);
          setIsEditMode(false);
          setSelectedTask(null);
          setNewTask({
            title: "",
            description: "",
            dueDate: "",
            status: "TODO",
          });
          await dispatch(getTasks(user.access));
        }
      } catch (error) {
        console.log(error);
        toast.error("Task not updated!");
      }
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      try {
        const user: {
          access: string;
        } = await getData("user");
        const response = await dispatch(
          deleteTask({
            id: selectedTask.id,
            token: user.access,
          })
        );

        if (response.type === "tasks/deleteTask/fulfilled") {
          toast.success("Task Deleted.");
          setShowDeleteModal(false);
          setSelectedTask(null);
          await dispatch(getTasks(user.access));
        }
      } catch (error) {
        console.log(error);
        toast.error("Task not deleted!");
      }
    }
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditMode(true);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.deadline).toISOString().split("T")[0],
      status: task.status,
    });
    setShowModal(true);
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setSelectedTask(null);
    setNewTask({ title: "", description: "", dueDate: "", status: "TODO" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return <FaCheckCircle className="w-5 h-5 text-green-600" />;
      case "IN_PROGRESS":
        return <FaClock className="w-5 h-5 text-yellow-600" />;
      case "TODO":
        return <FaExclamationCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DONE":
        return "bg-green-100 text-green-700";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";
      case "TODO":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-500 mt-1">
              {tasks?.results.length} tasks total
            </p>
          </div>
          <button
            onClick={() => {
              setIsEditMode(false);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow-sm"
          >
            <FaPlus className="w-4 h-4" />
            Create Task
          </button>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.results.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                {getStatusIcon(task.status)}
                {task.status !== "DONE" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(task)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(task)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {task.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Task Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? "Edit Task" : "Create New Task"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newTask.status}
                    onChange={(e) =>
                      setNewTask({ ...newTask, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditMode ? handleEditTask : handleCreateTask}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-150"
                >
                  {isEditMode ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Delete Task
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedTask?.title}"? This
                action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedTask(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTask}
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

export default MyTasks;

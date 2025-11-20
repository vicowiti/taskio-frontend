import { FaCheckCircle, FaClock, FaTasks } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import StatCard from "./StatCard";

const Dash = () => {
  const { stats } = useSelector((state: RootState) => state.tasks);

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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Task Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            color="bg-blue-50 text-blue-600"
            icon={FaTasks}
            value={stats?.stats.total_tasks || 0}
          />
          <StatCard
            title="Pending Tasks"
            color="bg-yellow-50 text-yellow-600"
            icon={FaClock}
            value={stats?.stats.todo_tasks || 0}
          />
          <StatCard
            title="In Progress"
            color="bg-blue-50 text-blue-600"
            icon={FaClock}
            value={stats?.stats.in_progress_tasks || 0}
          />
          <StatCard
            title="Done Tasks"
            color="bg-green-50 text-green-600"
            icon={FaCheckCircle}
            value={stats?.stats.done_tasks || 0}
          />
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Tasks
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {stats?.summary_tasks.map((task) => (
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

                      <span className="text-gray-500 text-xs">
                        Due: {new Date(task.deadline).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <></>
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

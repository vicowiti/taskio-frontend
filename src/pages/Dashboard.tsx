import { useEffect } from "react";
import Dash from "../components/Dash";
import { getData } from "../config/localStorage";
import { useAppDispatch } from "../redux/store/store";
import { tasksInit } from "../redux/slices/tasksSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchStats() {
      const user: { access: string } = await getData("user");

      await dispatch(tasksInit(user.access));
    }
    fetchStats();
  }, [dispatch]);
  return (
    <div>
      <Dash />
    </div>
  );
};

export default Dashboard;

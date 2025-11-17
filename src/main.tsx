import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import MyTeam from "./pages/MyTeam";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import DashboardShell from "./hocs/DashboardShell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardShell>
        <Dashboard />
      </DashboardShell>
    ),
  },
  {
    path: "/mytasks",
    element: (
      <DashboardShell>
        <MyTasks />
      </DashboardShell>
    ),
  },
  {
    path: "/myteam",
    element: (
      <DashboardShell>
        <MyTeam />
      </DashboardShell>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />,
    </Provider>
  </StrictMode>
);

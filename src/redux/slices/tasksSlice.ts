import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axios";
import type { CreateTaskPayload, ResultTask } from "../../types/tasks";
import type { GetTasksResponse } from "../../types/tasks";
import type { StatsObject } from "../../types/stats";

interface InitialState {
  tasks: GetTasksResponse | null;
  userTasks: ResultTask[];
  stats: StatsObject | null;
}
const initialState: InitialState = {
  tasks: null,
  userTasks: [],
  stats: null,
};

interface TaskCreation {
  data: CreateTaskPayload;
  token: string;
}
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: TaskCreation) => {
    const response = await axiosConfig(data.token).post("tasks/", data.data);

    return response.data;
  }
);

interface GETPayload {
  token: string;
  status?: "DONE" | "TODO" | "IN_PROGRESS" | null;
}
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (data: GETPayload) => {
    if (data.status) {
      const response = await axiosConfig(data.token).get(
        `tasks/?status=${data.status}`
      );
      return response.data;
    }

    const response = await axiosConfig(data.token).get(`tasks/`);
    return response.data;
  }
);

export const tasksInit = createAsyncThunk(
  "tasks/tasksInit",
  async (token: string) => {
    const response = await axiosConfig(token).get("tasks/init/");

    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ token, id }: { token: string; id: number }) => {
    const response = await axiosConfig(token).delete(`tasks/${id}/`);

    return response.data;
  }
);

interface UserTasks {
  id: number;
  token: string;
}
export const getUserTasks = createAsyncThunk(
  "tasks/getUserTasks",
  async (data: UserTasks) => {
    const response = await axiosConfig(data.token).get(
      `tasks/by-user/${data.id}/`
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({
    token,
    id,
    data,
  }: {
    token: string;
    id: number;
    data: CreateTaskPayload;
  }) => {
    const response = await axiosConfig(token).patch(`tasks/${id}/`, data);

    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(getUserTasks.fulfilled, (state, action) => {
      state.userTasks = action.payload;
    });
    builder.addCase(tasksInit.fulfilled, (state, action) => {
      state.stats = action.payload;
    });
  },
});

export default tasksSlice.reducer;

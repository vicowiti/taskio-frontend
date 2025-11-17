import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginPayload } from "../../types/user";
import axiosConfig from "../../config/axios";

const initialState = {};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginPayload) => {
    const response = await axiosConfig("").post("/auth/token/", data);

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;

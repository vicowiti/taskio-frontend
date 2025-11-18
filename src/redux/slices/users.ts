import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../../config/axios";
import type { GetUsersPayload, UserCreationPayload } from "../../types/user";

interface InitialState {
  usersObject: GetUsersPayload | null;
}

const initialState: InitialState = {
  usersObject: null,
};
interface UserPost {
  data: UserCreationPayload;
  token: string;
}
export const addUser = createAsyncThunk(
  "users/addUser",
  async (data: UserPost) => {
    const response = await axiosConfig(data.token).post("users/", data.data);

    return response.data;
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (token: string) => {
    const response = await axiosConfig(token).get("users/");

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersObject = action.payload;
    });
  },
});

export default userSlice.reducer;

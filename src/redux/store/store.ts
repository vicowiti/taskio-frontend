import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "../slices/authSlice";
import tasksSlice from "../slices/tasksSlice";
import userSlice from "../slices/users";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
    users: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

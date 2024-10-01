import { createSlice } from "@reduxjs/toolkit";

export const UserEmptyState = {
  id: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    createUser: (_, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    deleteUser: () => {
      return UserEmptyState;
    },
  },
});

export const { createUser, updateUser, deleteUser } = UserSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./login/reducer";

const store = configureStore({
  reducer: {
    usersReducer,
  },
});

export default store;
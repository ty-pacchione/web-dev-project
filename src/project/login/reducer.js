import { createSlice } from "@reduxjs/toolkit";
//this will allow us to save state of user without needing to request
const initialState = {
    currentUser: null,
  };


  const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
      },
    },
  });


export const { setCurrentUser } = slice.actions;
export default slice.reducer;
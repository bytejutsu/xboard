import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "vi",
  codeLanguage: "vi-VN",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.codeLanguage = action.payload === "vi" ? "vi-VN" : "en-US";
    },
  },
});

export const { setLanguage } = appSlice.actions;

export default appSlice.reducer;

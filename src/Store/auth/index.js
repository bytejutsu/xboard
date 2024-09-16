import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userData: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.userData
    }
  }
})

export const { setUserData } = authSlice.actions

export default authSlice.reducer

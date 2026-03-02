import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  authChecked: false
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setCredentials: (state, action)=> {
      const {accessToken, user} = action.payload;
      state.token = accessToken;
      state.user = user;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    }
  }
});

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;

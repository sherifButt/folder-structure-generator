
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
});

export const { setUser, setAccessToken, setError, clearAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;

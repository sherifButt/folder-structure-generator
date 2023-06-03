// Sure, here's an implementation of authSlice.js:



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser, setLoading, setError, clearAuthState } = authSlice.actions;

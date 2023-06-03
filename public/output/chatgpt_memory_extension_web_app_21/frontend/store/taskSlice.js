

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addTask, removeTask, updateTask, setTasks, setLoading, setError } = taskSlice.actions;

export default taskSlice.reducer;

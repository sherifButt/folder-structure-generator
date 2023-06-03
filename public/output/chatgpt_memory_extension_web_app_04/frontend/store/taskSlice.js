// Sure, here's an example of taskSlice.js:



const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    selectedTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
  },
});

export const { addTask, removeTask, selectTask, updateTask } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;

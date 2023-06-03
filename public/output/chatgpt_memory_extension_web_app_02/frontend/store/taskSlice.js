
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTasksStart(state) {
      state.loading = true;
    },
    fetchTasksSuccess(state, action) {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTasksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;

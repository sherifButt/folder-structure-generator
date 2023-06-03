

const taskSlice = createSlice({
  name: 'task',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false
      };
      state.push(newTask);
    },
    toggleTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      state[index].completed = !state[index].completed;
    },
    deleteTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      state.splice(index, 1);
    }
  }
});

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

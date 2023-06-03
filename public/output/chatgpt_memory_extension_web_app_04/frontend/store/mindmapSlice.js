// Sure, here's an implementation for the mindmapSlice.js file:


import axios from 'axios';

const initialState = {
  mindmaps: [],
  status: 'idle',
  error: null,
};

export const fetchMindmaps = createAsyncThunk('mindmaps/fetchMindmaps', async () => {
  const response = await axios.get('/api/mindmaps');
  return response.data;
});

export const addNewMindmap = createAsyncThunk('mindmaps/addNewMindmap', async (initialMindmap) => {
  const response = await axios.post('/api/mindmaps', { mindmap: initialMindmap });
  return response.data;
});

const mindmapSlice = createSlice({
  name: 'mindmaps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMindmaps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMindmaps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mindmaps = state.mindmaps.concat(action.payload);
      })
      .addCase(fetchMindmaps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewMindmap.fulfilled, (state, action) => {
        state.mindmaps.push(action.payload);
      });
  },
});

export const selectAllMindmaps = (state) => state.mindmaps.mindmaps;

export default mindmapSlice.reducer;


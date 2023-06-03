



const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
};

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      state.selectedNode = null;
    },
    updateNode: (state, action) => {
      const { id, title, description } = action.payload;
      const node = state.nodes.find((node) => node.id === id);
      if (node) {
        node.title = title;
        node.description = description;
      }
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    removeEdge: (state, action) => {
      const { source, target } = action.payload;
      state.edges = state.edges.filter(
        (edge) => edge.source !== source || edge.target !== target
      );
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload;
    },
  },
});

export const {
  addNode,
  removeNode,
  updateNode,
  addEdge,
  removeEdge,
  selectNode,
} = mindmapSlice.actions;

export default mindmapSlice.reducer;


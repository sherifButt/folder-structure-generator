



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
      if (state.selectedNode === nodeId) {
        state.selectedNode = null;
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
    updateNode: (state, action) => {
      const updatedNode = action.payload;
      const index = state.nodes.findIndex((node) => node.id === updatedNode.id);
      if (index !== -1) {
        state.nodes[index] = updatedNode;
      }
    },
  },
});

export const {
  addNode,
  removeNode,
  addEdge,
  removeEdge,
  selectNode,
  updateNode,
} = mindmapSlice.actions;

export default mindmapSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState: {
    nodes: [],
    edges: [],
  },
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    deleteNode: (state, action) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload);
    },
    deleteEdge: (state, action) => {
      state.edges = state.edges.filter(edge => edge.id !== action.payload);
    },
    updateNode: (state, action) => {
      const nodeIndex = state.nodes.findIndex(node => node.id === action.payload.id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = action.payload;
      }
    },
    updateEdge: (state, action) => {
      const edgeIndex = state.edges.findIndex(edge => edge.id === action.payload.id);
      if (edgeIndex !== -1) {
        state.edges[edgeIndex] = action.payload;
      }
    },
  },
});

export const { addNode, addEdge, deleteNode, deleteEdge, updateNode, updateEdge } = mindmapSlice.actions;

export default mindmapSlice.reducer;

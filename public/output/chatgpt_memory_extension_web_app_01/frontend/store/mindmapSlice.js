
import { createSlice } from "@reduxjs/toolkit";

const mindmapSlice = createSlice({
  name: "mindmap",
  initialState: {
    nodes: [],
    edges: [],
    selectedNode: null,
    selectedEdge: null,
  },
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.edges = state.edges.filter(
        (edge) =>
          edge.source !== action.payload && edge.target !== action.payload
      );
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      state.nodes[index] = action.payload;
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    removeEdge: (state, action) => {
      state.edges = state.edges.filter(
        (edge) =>
          !(edge.source === action.payload.source && edge.target === action.payload.target)
      );
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    selectEdge: (state, action) => {
      state.selectedEdge = action.payload;
    },
  },
});

export const { addNode, removeNode, updateNode, addEdge, removeEdge, selectNode, selectEdge } =
  mindmapSlice.actions;

export default mindmapSlice.reducer;

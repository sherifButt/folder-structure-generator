
import { createSlice } from '@reduxjs/toolkit';

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState: {
    nodes: [],
    edges: [],
    currentId: null
  },
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const { id, ...newData } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);
      state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...newData };
    },
    deleteNode: (state, action) => {
      const { id } = action.payload;
      state.nodes = state.nodes.filter(node => node.id !== id);
      state.edges = state.edges.filter(edge => edge.source !== id && edge.target !== id);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    deleteEdge: (state, action) => {
      const { source, target } = action.payload;
      state.edges = state.edges.filter(edge => edge.source !== source || edge.target !== target);
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    }
  }
});

export const { addNode, updateNode, deleteNode, addEdge, deleteEdge, setCurrentId } = mindmapSlice.actions;

export default mindmapSlice.reducer;

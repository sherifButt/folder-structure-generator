

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState: {
    nodes: [],
    edges: [],
    selectedNode: null,
    selectedEdge: null,
  },
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload)
    },
    updateNode: (state, action) => {
      const { id, title, description } = action.payload
      const node = state.nodes.find((node) => node.id === id)
      if (node) {
        node.title = title
        node.description = description
      }
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload
      state.nodes = state.nodes.filter((node) => node.id !== nodeId)
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      )
      if (state.selectedNode === nodeId) {
        state.selectedNode = null
      }
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload)
    },
    deleteEdge: (state, action) => {
      const edgeId = action.payload
      state.edges = state.edges.filter((edge) => edge.id !== edgeId)
      if (state.selectedEdge === edgeId) {
        state.selectedEdge = null
      }
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload
    },
    selectEdge: (state, action) => {
      state.selectedEdge = action.payload
    },
  },
})

export const { addNode, updateNode, deleteNode, addEdge, deleteEdge, selectNode, selectEdge } = mindmapSlice.actions

export default mindmapSlice.reducer

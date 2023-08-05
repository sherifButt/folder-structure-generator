let nodeId = 0


/**
 * Recursively creates nodes and edges from a nested object for use with react-flow.
 *
 * Each key in the object becomes a node, and each parent-child relationship in the
 * object becomes an edge. If a key's value is an object, the function is called
 * recursively with that object to create nodes and edges for its contents.
 *
 * @param {Object} obj - The object to create nodes and edges from.
 * @param {string} [parentId=null] - The ID of the parent node, if any.
 * @returns {Object} An object containing two properties: `nodes` and `edges`.
 * `nodes` is an array of node objects, each with an `id`, `data`, and `position`.
 * `edges` is an array of edge objects, each with an `id`, `source`, and `target`.
 */

function createNodesAndEdges(obj, parentId = null, depth = 0) {
   if (obj === null || obj === undefined) {
      throw new Error('Input object cannot be null or undefined')
   }

   const nodes = []
   const edges = []

   for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
         continue
      }

      const newNodeId = `node${nodeId++}`
      const data = obj[key]

      if (data === null || data === undefined) {
         throw new Error(`Data for key "${key}" cannot be null or undefined`)
      }

      nodes.push({
         id: newNodeId,
         data: {
            label: `${key} (${data.extension || 'dir'})`,
            ...data,
         },
         position: { x: depth * 200, y: nodes.length * 100 },
      })

      if (parentId) {
         edges.push({
            id: `edge${parentId}-${newNodeId}`,
            source: parentId,
             target: newNodeId,
            type: "smoothstep",
         })
      }

      if (typeof data === 'object' && data !== null && !data.extension) {
         const { nodes: childNodes, edges: childEdges } = createNodesAndEdges(
            data,
            newNodeId,
            depth + 1
         )
         nodes.push(...childNodes)
         edges.push(...childEdges)
      }
   }

   return { nodes, edges }
}



module.exports = createNodesAndEdges
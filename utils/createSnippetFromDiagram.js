/**
* This function takes the nodes and edges of a diagram and creates a snippet
* object from them.
* @param {Array} nodes - An array of node objects.
* @param {Array} edges - An array of edge objects.
* 
*/

function createSnippetFromDiagram(nodes, edges) {
   if (!nodes || !edges) {
      throw new Error('Nodes and edges are required')
   }

   const snippet = {}
   const nodeMap = nodes.reduce((map, node) => {
      if (!node || !node.id || !node.data) {
         throw new Error('Invalid node format')
      }
      map[node.id] = { ...node.data, children: [] }
      return map
   }, {})

   edges.forEach(edge => {
      if (!edge || !edge.source || !edge.target) {
         throw new Error('Invalid edge format')
      }
      const parent = nodeMap[edge.source]
      const child = nodeMap[edge.target]
      if (parent && child) {
         parent.children.push(child)
      }
   })

   function buildStructure(node) {
      if (!node) {
         throw new Error('Invalid node')
      }
      if (node.children.length === 0) {
         return {
            description: node.description,
            extension: node.label
               .split(' ')[1]
               .replace('(', '')
               .replace(')', ''),
            fileContent: node.fileContent,
            summary: node.summary,
         }
      }

      const structure = {}
      node.children.forEach(child => {
         structure[child.label.split(' ')[0]] = buildStructure(child)
      })
      return structure
   }

   const rootNodes = nodes.filter(
      node => !edges.find(edge => edge.target === node.id)
   )
   rootNodes.forEach(rootNode => {
      snippet[rootNode.data.label.split(' ')[0]] = buildStructure(
         nodeMap[rootNode.id]
      )
   })

   return snippet
}

try {
   const snippet = createSnippetFromDiagram(nodes, edges)
   console.log(snippet)
} catch (error) {
   console.error(error.message)
}


module.exports = createSnippetFromDiagram
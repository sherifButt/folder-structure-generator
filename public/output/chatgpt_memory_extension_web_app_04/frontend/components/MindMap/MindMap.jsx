// Sure, here's an example implementation of MindMap.jsx:



const MindMap = ({ data }) => {
  const renderNode = (node) => {
    return (
      <div>
        <p>{node.title}</p>
        {node.children && node.children.map((child) => renderNode(child))}
      </div>
    );
  };

  return <div>{renderNode(data)}</div>;
};

export default MindMap;


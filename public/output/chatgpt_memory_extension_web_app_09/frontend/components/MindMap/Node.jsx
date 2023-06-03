

const Node = ({ id, label, children, onNodeClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onNodeClick(id);
  };

  return (
    <div className="mindmap-node" onClick={handleClick}>
      <div className="mindmap-node-label">{label}</div>
      {children}
    </div>
  );
};

export default Node;

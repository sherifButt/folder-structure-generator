

function Node(props) {
  const { id, title, children } = props;

  return (
    <div className="node" id={id}>
      <div className="title">{title}</div>
      <div className="children">{children}</div>
    </div>
  );
}

export default Node;

// Sure, here's an implementation of Node.jsx:



function Node(props) {
  return (
    <div className="node" style={{ left: props.x, top: props.y }}>
      {props.children}
    </div>
  );
}

export default Node;


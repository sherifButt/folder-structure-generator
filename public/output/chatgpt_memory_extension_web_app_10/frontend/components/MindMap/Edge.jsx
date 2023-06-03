Here is the implementation of Edge.jsx:



function Edge(props) {
  const { x1, y1, x2, y2 } = props;

  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
  );
}

export default Edge;

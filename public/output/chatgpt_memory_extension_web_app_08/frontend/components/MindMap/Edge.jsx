

const Edge = ({ from, to }) => {
  return (
    <line
      className="edge"
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
    />
  );
};

export default Edge;

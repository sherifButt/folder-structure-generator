



function Edge({ start, end }) {
  return (
    <svg>
      <path d={`M${start.x},${start.y}L${end.x},${end.y}`} />
    </svg>
  );
}

export default Edge;


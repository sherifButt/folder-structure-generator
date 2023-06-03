
// Importing the required modules
import React from 'react';

// Defining the Edge component
function Edge(props) {
  const { from, to } = props;

  // Rendering the Edge component
  return (
    <>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
    </>
  );
}

// Exporting the Edge component
export default Edge;

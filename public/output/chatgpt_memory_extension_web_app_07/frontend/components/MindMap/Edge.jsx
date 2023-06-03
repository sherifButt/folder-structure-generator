// Here's the implementation of Edge.jsx:

import React from 'react';

const Edge = ({ coordinates }) => {
  return (
    <svg>
      <line x1={coordinates.x1} y1={coordinates.y1} x2={coordinates.x2} y2={coordinates.y2} stroke="black" />
    </svg>
  );
};

export default Edge;
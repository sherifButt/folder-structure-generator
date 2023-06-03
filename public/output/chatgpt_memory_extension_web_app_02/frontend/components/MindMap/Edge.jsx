// Sure, here's an implementation of Edge.jsx:


import React from 'react';

const Edge = ({ startX, startY, endX, endY }) => {
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
  
  return (
    <div
      style={{
        position: 'absolute',
        transform: `rotate(${angle}deg)`,
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${length}px`,
        height: '2px',
        backgroundColor: 'black'
      }}
    />
  );
};

export default Edge;

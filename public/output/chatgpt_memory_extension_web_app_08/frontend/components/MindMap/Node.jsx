

import React from 'react';

function Node(props) {
  const { title, description, children } = props;

  return (
    <div className="node">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export default Node;

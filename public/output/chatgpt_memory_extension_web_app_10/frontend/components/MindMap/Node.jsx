

import React from 'react';

function Node(props) {
  const { text, children } = props;

  return (
    <div className="node">
      <div className="node-text">{text}</div>
      {children && <div className="node-children">{children}</div>}
    </div>
  );
}

export default Node;

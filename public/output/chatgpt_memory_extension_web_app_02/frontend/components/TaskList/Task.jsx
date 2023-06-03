Sure, here's an implementation of Task.jsx:

```javascript
import React from 'react';

function Task({ task }) {
  return (
    <div className="task">
      <input type="checkbox" />
      <span>{task.name}</span>
    </div>
  );
}

export default Task;
```

The `Task` component takes in a `task` object as a prop, which contains information about the task to be displayed. The component returns a div containing a checkbox and the name of the task.
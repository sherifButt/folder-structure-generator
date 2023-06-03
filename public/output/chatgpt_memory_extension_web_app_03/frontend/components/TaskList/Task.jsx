// Sure, here's an implementation of Task.jsx:

```javascript
import React from 'react';

function Task({ task }) {
  return (
    <div className="task">
      <input type="checkbox" />
      <span>{task.title}</span>
      <button>Delete</button>
    </div>
  );
}

export default Task;
```

This code exports a functional React component called `Task` that takes a `task` object as a prop and renders a checkbox, the task's title, and a delete button.
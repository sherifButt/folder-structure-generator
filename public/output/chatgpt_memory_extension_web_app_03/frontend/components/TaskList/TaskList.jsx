//Sure, here's the code:

```
import React from 'react';

function TaskList(props) {
  const {tasks} = props;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" checked={task.completed} />
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
```

This file exports a TaskList component that takes a `tasks` prop, which is an array of objects that have an `id`, `title`, and `completed` property. The component renders a list of tasks, with each task being displayed in a list item with a checkbox and the task title.
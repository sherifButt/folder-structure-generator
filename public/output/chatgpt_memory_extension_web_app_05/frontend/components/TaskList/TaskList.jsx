// Sure, here's the code for TaskList.jsx:

```
import React from "react";

function TaskList(props) {
  const { tasks } = props;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
```

This component takes in a `tasks` prop, which is an array of task objects containing a unique `id` and a `name` property. It then maps through this array to display each task name in an unordered list. The `key` prop is set to the task's `id` to ensure each list item has a unique identifier. The component is then exported for use in other React components.
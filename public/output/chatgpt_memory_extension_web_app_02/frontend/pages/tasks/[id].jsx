
import React from 'react';

const TaskPage = ({ task }) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskPage;
```

Note: This code assumes that the `task` prop is an object with `title` and `description` properties. You will need to pass this prop to the component from the parent component that is rendering the `TaskPage` component.
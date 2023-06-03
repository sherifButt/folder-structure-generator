



function TaskList(props) {
  const { tasks } = props;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;



The `TaskList` component is exported as a default export.
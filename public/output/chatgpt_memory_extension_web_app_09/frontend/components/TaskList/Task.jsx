



function Task({ task }) {
  return (
    <div className="task">
      <input type="checkbox" />
      <span>{task.description}</span>
    </div>
  );
}

export default Task;


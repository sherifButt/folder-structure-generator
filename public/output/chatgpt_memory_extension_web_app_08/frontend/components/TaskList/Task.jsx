// Here's an example implementation of Task.jsx:



function Task({ task }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}

export default Task;

// This component takes in an object `task` as a prop and renders its `title` and `description` properties within an HTML `div` element.
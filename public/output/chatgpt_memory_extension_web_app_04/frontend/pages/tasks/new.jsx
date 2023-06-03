// Sure, here's an example implementation of new.jsx:



export default function NewTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to backend API
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}


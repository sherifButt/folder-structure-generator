// Sure, here's an implementation of new.jsx file:

```jsx
import React, { useState } from 'react';

export default function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // code to create new task
    console.log('Task created!');
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
```

This component contains a form with input fields for the title, description and due date of the new task. The state is managed using the `useState` hook. The `handleSubmit` function is triggered when the form is submitted, and logs a message to the console.
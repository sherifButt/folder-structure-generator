// Sure, here's an implementation of new.jsx:

```
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@reduxjs/toolkit';
import { addTask } from '../redux/taskSlice';

const NewTaskPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [createTask] = useMutation(addTask, {
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {
      setError(err.message);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTask({ title, description });
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create a New Task</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default NewTaskPage;

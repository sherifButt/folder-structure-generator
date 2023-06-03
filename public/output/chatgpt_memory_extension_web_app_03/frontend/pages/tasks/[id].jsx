Here's the full code for `[id].jsx` file in Next.js:

```javascript
import React from 'react';

export default function TaskPage({ task }) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/tasks');
  const tasks = await res.json();

  const paths = tasks.map((task) => ({
    params: { id: task.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/tasks/${params.id}`);
  const task = await res.json();

  return {
    props: { task },
  };
}
```

The `getStaticPaths` function fetches all the tasks from an external API (`https://api.example.com/tasks`), maps them to an array of `params` objects where each `id` is a string, and returns them as `paths`. This tells Next.js to pre-render all the task pages during build time.

The `getStaticProps` function fetches the specific task with the given `id` from the API (`https://api.example.com/tasks/${params.id}`) and returns it as `props`. This allows us to access the task data in the `TaskPage` component.

The `TaskPage` component receives the `task` object as a prop and renders its properties as HTML elements.
// Sure, here's an implementation of new.jsx:

```jsx
import React from 'react';

const New = () => {
  return (
    <div>
      <h1>Create a New Mind Map</h1>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description"></textarea>

        <button type="submit">Create Mind Map</button>
      </form>
    </div>
  );
};

export default New;
```

This file defines a functional component called `New` that returns a form for creating a new mind map. The form contains fields for the title and description of the mind map and a submit button.
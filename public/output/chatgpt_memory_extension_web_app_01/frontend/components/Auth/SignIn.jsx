
import React from 'react';
import { signIn } from 'next-auth/client';

function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={signIn}>Sign in with NextAuth</button>
    </div>
  );
}

export default SignIn;
```

This file exports a component called `SignIn` that renders a simple sign-in form with a button that triggers the `signIn` function provided by `next-auth/client`.
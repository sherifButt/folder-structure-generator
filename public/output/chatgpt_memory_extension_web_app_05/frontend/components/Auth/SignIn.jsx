// Sure, here's an example of SignIn.jsx using React and NextAuth:

```
import React from 'react';
import { signIn } from 'next-auth/client';

const SignIn = () => {
  return (
    <button onClick={() => signIn()}>Sign In</button>
  );
};

export default SignIn;
```

This component is a simple button that, when clicked, calls the `signIn()` function provided by NextAuth to initiate the sign-in process.
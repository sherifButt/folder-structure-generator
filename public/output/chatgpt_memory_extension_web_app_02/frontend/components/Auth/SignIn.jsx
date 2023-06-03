import React from 'react';
import { signIn } from 'next-auth/react';

function SignIn() {
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

export default SignIn;

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <>
      <h2>Sign In</h2>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </>
  );
}

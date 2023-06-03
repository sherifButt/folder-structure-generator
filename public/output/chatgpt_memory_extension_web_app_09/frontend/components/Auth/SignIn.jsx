
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}

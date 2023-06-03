
import { signIn, useSession } from 'next-auth/client';

const SignIn = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session && (
        <>
          <h1>Sign In</h1>
          <button onClick={() => signIn()}>Sign in with Google</button>
        </>
      )}
      {session && (
        <>
          <h1>Welcome, {session.user.name}!</h1>
        </>
      )}
    </>
  );
};

export default SignIn;

import React from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    return null;
  }

  return (
    <>
      <h1>Sign in</h1>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </>
  );
}
``` 

JSdocs:
```jsdoc
/**
 * Handles user sign-in using NextAuth.
 * @returns {JSX.Element} Sign-in page JSX element.
 */
```

Swagger:
```yaml
/signin:
  post:
    summary: Handles user sign-in using NextAuth.
    responses:
      '200':
        description: Sign-in page returned successfully.

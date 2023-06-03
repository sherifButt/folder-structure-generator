// Sure, here's the implementation of the SignUp component:

```
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, loading] = useSession();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.status === 200) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
```

Note: This is just the frontend implementation of the SignUp component. The backend implementation of the '/api/auth/signup' route is not included here.
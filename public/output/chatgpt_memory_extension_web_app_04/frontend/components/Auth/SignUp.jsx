// Sure, here's an example implementation of SignUp.jsx:


import { useRouter } from 'next/router';
import { signUp } from 'next-auth/client';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUp('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      alert(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}


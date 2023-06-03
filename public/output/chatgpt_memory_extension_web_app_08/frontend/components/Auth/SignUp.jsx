// Here is the implementation of SignUp.jsx


import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';

const SignUp = () => {
  const [session, loading] = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      console.log(await res.text());
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    router.push('/dashboard');
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

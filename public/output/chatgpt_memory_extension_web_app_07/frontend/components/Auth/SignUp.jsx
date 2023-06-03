
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import styles from "../styles/Auth.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [session, loading] = useSession();
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (data.success) {
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (session) {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

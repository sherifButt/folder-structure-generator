


import { useRouter } from 'next/router';

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Task {id}</h1>
      <p>This is the page for task {id}.</p>
    </div>
  );
}


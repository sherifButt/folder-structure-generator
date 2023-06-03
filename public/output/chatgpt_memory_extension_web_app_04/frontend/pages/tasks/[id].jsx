



export default function TaskPage({ task }) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://example.com/api/tasks/${id}`);
  const task = await res.json();

  return {
    props: {
      task,
    },
  };
}


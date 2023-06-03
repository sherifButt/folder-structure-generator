
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Plan: {user.plan}</p>
    </div>
  );
};

export default Dashboard;


import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div> 
      <h1>Welcome to your dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Plan: {user.plan}</p>
    </div>
  );
};

export default Dashboard;


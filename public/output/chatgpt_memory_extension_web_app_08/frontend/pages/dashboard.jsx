
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to your Dashboard, {user.name}!</h1>
      <div className="bg-gray-200 p-8 rounded-md">
        <h2 className="text-xl font-bold mb-4">Your Account Info:</h2>
        <p className="text-lg mb-2"><span className="font-bold">Name:</span> {user.name}</p>
        <p className="text-lg mb-2"><span className="font-bold">Email:</span> {user.email}</p>
        <p className="text-lg mb-2"><span className="font-bold">Membership Plan:</span> {user.membershipPlan}</p>
      </div>
    </div>
  );
};

export default Dashboard;

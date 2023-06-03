
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Membership Level: {user.membership}</p>
      {/* More user-specific information can be added here */}
    </div>
  );
};

export default Dashboard;

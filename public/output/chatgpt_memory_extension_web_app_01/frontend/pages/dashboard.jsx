import React from 'react';
import { connect } from 'react-redux';

const Dashboard = (props) => {
  const { user } = props;

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Account Type: {user.accountType}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);

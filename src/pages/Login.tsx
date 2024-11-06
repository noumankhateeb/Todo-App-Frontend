import React from 'react';
import AuthForm from '../components/AuthForm';

const Login: React.FC = () => {

  return (
    <div>
      <AuthForm isSignup={false} />
    </div>
  );
};

export default Login;

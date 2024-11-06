import React from 'react';
import AuthForm from '../components/AuthForm';


const Signup: React.FC = () => {

  return (
    <div>
      <AuthForm isSignup={true} />
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import '../styles/AuthForm.scss'

interface AuthFormProps {
  isSignup: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    const userData = { email, password };
    if (isSignup) {
      dispatch(signup(userData) as any);
    } else {
      dispatch(login(userData) as any);
    }

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="submit-button" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>

          <div className="signup-link">
            {isSignup ? (
              <>
                <span>Already have an account? </span><a href="/login">Login</a>
              </>
            ) : (
              <>
                <span>Don't have an account? </span><a href="/signup">Signup</a>
              </>
            )}
          </div>


        </form>
      </div>
    </div>
  );
};

export default AuthForm;

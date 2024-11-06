import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../redux/storeResetSlice';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(reset());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title">To Do App</div>
        <button className="navbar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;





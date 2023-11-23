import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <nav className="navbar shadow-sm bg-body-tertiary px-4 sticky-top w-100">
      <div className="container-fluid">
        <h3 className="navbar-brand">BeFocused</h3>
        <div className="d-flex">
          <Link to="/" className="btn px-4">About</Link>
          <button type="submit" to="/login" className="btn lj-bgcolor-1 ms-4 px-4" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </nav>
    
  )
}

export default Header;
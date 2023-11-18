import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/login" className="nav-item">LogIn</Link>
      {/* Add more navigation items as needed */}
    </div>
  );
};

export default NavBar;

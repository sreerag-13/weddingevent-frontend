import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCamera, FaPlus, FaMoneyBillAlt, FaCalendarAlt } from 'react-icons/fa';
import './Nav3.css'; // Ensure the CSS file is imported

const Nav3 = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage items
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="nav3-sidebar bg-pink shadow-sm"> {/* Updated class name */}
      <div className="nav3-sidebar-header">
        <h2 className="text-center text-white">WedCode</h2>
      </div>

      <ul className="nav nav3-flex-column mt-4">
        <li className="nav3-item mb-3">
          <Link className="nav3-link text-white" to="/Auditp">
            <FaHome className="nav3-icon me-2" /> UserProfile
          </Link>
        </li>
        <li className="nav3-item mb-3">
          <Link className="nav3-link text-white" to="/Aviewp">
            <FaCamera className="nav3-icon me-2" /> MyPost
          </Link>
        </li>
        <li className="nav3-item mb-3">
          <Link className="nav3-link text-white" to="/Createa">
            <FaPlus className="nav3-icon me-2" /> Create Post
          </Link>
        </li>
        <li className="nav3-item mb-3">
          <Link className="nav3-link text-white" to="/Apricing">
            <FaMoneyBillAlt className="nav3-icon me-2" /> Add Pricing
          </Link>
        </li>
        <li className="nav3-item mb-3">
          <Link className="nav3-link text-white" to="/Statusa">
            <FaCalendarAlt className="nav3-icon me-2" /> Booking
          </Link>
        </li>
      </ul>

      <div className="text-center mt-auto">
        <button className="btn btn-outline-danger nav3-logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav3;

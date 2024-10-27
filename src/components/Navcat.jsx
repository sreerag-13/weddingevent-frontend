import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Navcat.css'; // Import custom styles
import { FaHome, FaPlus, FaList, FaCalendarAlt, FaDoorOpen } from 'react-icons/fa'; // Import icons from react-icons

const Navcat = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear(); // Clear all session storage items
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="sidebar bg-pink shadow-sm">
      <div className="sidebar-header">
        <h2 className="text-center text-white">WedCode</h2>
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Caterp">
            <FaHome className="nav-icon me-2" />User Profile
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Cviewpost">
            <FaList className="nav-icon me-2" /> My Post
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Createc">
            <FaPlus className="nav-icon me-2" /> Create Post
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Cpricing">
            <FaCalendarAlt className="nav-icon me-2" /> Add Pricing
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Statusc">
            <FaDoorOpen className="nav-icon me-2" /> Booking
          </Link>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-white disabled" aria-disabled="true">
            Disabled
          </a>
        </li>
      </ul>

      <button className="btn btn-outline-danger mt-auto" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navcat;

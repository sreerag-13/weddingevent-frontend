import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation and useNavigate for programmatic navigation
import { FaCamera, FaPlus, FaCalendarAlt } from 'react-icons/fa'; // Import icons from react-icons
import './NavP.css'; // Import custom styles

const NavP = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle logout
  const handleLogout = () => {
    // Clear session storage or any other logout operations
    sessionStorage.clear(); // Clear all session storage items
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="sidebar bg-pink shadow-sm">
      <div className="sidebar-header">
        <h2 className="text-center text-white">WedCode</h2> {/* Changed to WedCode */}
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" aria-current="page" to="/Photop">
            UserProfile
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Viewpostp">
            <FaCamera className="nav-icon me-2" /> MyPost
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Createp">
            <FaPlus className="nav-icon me-2" /> Create
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Ppricing">
            <FaPlus className="nav-icon me-2" /> Add Pricing
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Statusp">
            <FaCalendarAlt className="nav-icon me-2" /> Booking
          </Link>
        </li>
      </ul>

      <div className="text-center mt-auto">
        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavP;

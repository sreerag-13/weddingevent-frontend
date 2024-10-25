import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import './Nav2.css'; // Import custom styles
import { FaCamera, FaCalendarAlt, FaUtensils } from 'react-icons/fa'; // Import icons from react-icons

const Nav2 = () => {
  return (
    <div className="sidebar bg-pink shadow-sm">
      <div className="sidebar-header">
        <h2 className="text-center text-white">WedCode</h2> {/* Changed to WedCode */}
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Userp">
            Userprofile
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Statusu">
            <FaCalendarAlt className="nav-icon me-2" /> Booking
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/Billingu">
            <FaUtensils className="nav-icon me-2" /> Billing
          </Link>
        </li>
        <li className="nav-item dropdown mb-3">
          <a
            className="nav-link dropdown-toggle text-white"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Services
          </a>
          <ul className="dropdown-menu bg-pink">
            <li>
              <Link className="dropdown-item" to="/Cardsp">
                <FaCamera className="nav-icon me-2" /> Photographer
              </Link>
            </li>
            <li><Link className="dropdown-item" to="/Carda">Auditorium</Link></li>
            <li><Link className="dropdown-item" to="/Cardc">Catering</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-white disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>

      {/* Search form */}
    </div>
  );
};

export default Nav2;

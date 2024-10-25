import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import { FaCamera, FaPlus, FaCalendarAlt } from 'react-icons/fa'; // Import icons from react-icons
import './NavP.css'; // Import custom styles

const NavP = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-pink shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">WedCode</a> {/* Changed to WedCode */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/Viewpostp">
                <FaCamera className="nav-icon" /> MyPost
              </Link>
              <Link className="nav-link" to="/Createp">
                <FaPlus className="nav-icon" /> Create
              </Link>
              <Link className="nav-link" to="/Ppricing">
                <FaPlus className="nav-icon" /> Add Pricing
              </Link>
              <Link className="nav-link" to="/Statusp">
                <FaCalendarAlt className="nav-icon" /> Booking
              </Link>
            </div>
            <button className="btn btn-outline-danger ms-auto" type="button">Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavP;

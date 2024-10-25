import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Nav2 from './Nav2'; // Import the Nav2 component
import { FaPrint, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons for print and expand/collapse
import './Billingu.css'; // Import the CSS file for styling

const Billingu = () => {
  const [billingSummary, setBillingSummary] = useState({});
  const [error, setError] = useState('');
  const [expandedCard, setExpandedCard] = useState(null); // State to track which card is expanded
  const printRefs = useRef([]); // To store refs for each billing card

  useEffect(() => {
    const fetchBillingSummary = async () => {
      const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage

      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8082/api/user/billing', { userId });

        if (response.data.billingSummary) {
          setBillingSummary(response.data.billingSummary);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching billing summary:', err);
        setError('Unable to fetch billing summary.');
      }
    };

    fetchBillingSummary();
  }, []);

  const handlePrint = (index) => {
    const printContent = printRefs.current[index];
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Function to toggle the expanded state of a card
  const toggleExpandCard = (date) => {
    setExpandedCard(expandedCard === date ? null : date);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f0f2f5' }}>
      <Nav2 /> {/* Add Nav2 component here */}
      <div className="billing-container p-4"> {/* Add padding to avoid overlap with the navbar */}
        <h2>Billing Summary</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {Object.entries(billingSummary).length > 0 ? (
          Object.entries(billingSummary).map(([date, costs], index) => (
            <div key={date} className="billing-card" ref={el => printRefs.current[index] = el}>
              <div className="card-header" onClick={() => toggleExpandCard(date)} style={{ cursor: 'pointer' }}>
                <h3>Date: {date} 
                  {expandedCard === date ? (
                    <FaChevronUp className="ms-2" />
                  ) : (
                    <FaChevronDown className="ms-2" />
                  )}
                </h3>
              </div>
              {expandedCard === date && (
                <div className="card-content">
                  <p>Auditorium Cost: ₹{costs.auditorium || 0}</p>
                  <p>Photographer Cost: ₹{costs.photographer || 0}</p>
                  <p>Catering Cost: ₹{costs.catering || 0}</p>
                  <p>Total Cost: ₹{costs.totalCost || 0}</p>
                  <button className="print-button" onClick={() => handlePrint(index)}> {/* Print button */}
                    <FaPrint className="me-2" /> Print
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="billing-card">
            <p>No billing summary available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billingu;

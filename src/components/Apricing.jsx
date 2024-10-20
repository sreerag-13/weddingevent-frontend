import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import your NavP component

const Apricing = () => {
  const [formData, setFormData] = useState({
    Capacity: '',
    price: '',
    type: 'AC', // Default value set to "AC"
    duration: '', // Added duration
  });
  const [message, setMessage] = useState(''); // Success/error messages
  const [pricingList, setPricingList] = useState([]); // Hold all pricing data
  const [editingId, setEditingId] = useState(null); // Track the ID for editing
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch pricing data on component mount
  const fetchPricingData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/get-auditorium-pricing'); // Update to your endpoint for auditorium pricing
      setPricingList(response.data);
    } catch (error) {
      console.error('Error fetching auditorium pricing data:', error);
      setMessage('Error fetching auditorium pricing data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      setMessage('Unauthorized. Please log in.');
      return;
    }

    try {
      const response = editingId
        ? await axios.put(
            `http://localhost:8082/update-auditorium-pricing/${editingId}`,
            { ...formData, userId },
          )
        : await axios.post(
            'http://localhost:8082/create-auditorium-pricing',
            { ...formData, userId },
          );

      setMessage(`Auditorium pricing ${editingId ? 'updated' : 'created'} successfully!`);

      if (editingId) {
        setPricingList((prevList) =>
          prevList.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        setPricingList((prevList) => [...prevList, response.data]);
      }

      setEditingId(null);
      setFormData({ Capacity: '', price: '', type: 'AC', duration: '' }); // Resetting type to default
    } catch (error) {
      console.error('Error creating/updating auditorium pricing:', error);
      setMessage('Error creating/updating auditorium pricing.');
    }
  };

  const handleEdit = (pricing) => {
    setFormData(pricing);
    setEditingId(pricing._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/delete-auditorium-pricing/${id}`);
      setMessage('Auditorium pricing deleted successfully!');
      fetchPricingData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting auditorium pricing:', error);
      setMessage('Error deleting auditorium pricing.');
    }
  };

  return (
    <div>
      <NavP /> {/* Include the navigation component */}
      <div className="container">
        <h2>Auditorium Pricing Package Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="Capacity" className="form-label">
                Capacity
              </label>
              <input
                type="text"
                className="form-control"
                name="Capacity"
                placeholder="Enter auditorium capacity"
                value={formData.Capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Enter auditorium price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="duration" className="form-label">
                Duration
              </label>
              <input
                type="text"
                className="form-control"
                name="duration"
                placeholder="Enter duration (e.g., 8 hours)"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <button type="submit" className="btn btn-success w-100">
                {editingId ? 'Update Package' : 'Register Package'}
              </button>
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <a href="/" className="btn btn-secondary w-100">
                Home
              </a>
            </div>
          </div>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}

        <h3 className="mt-5">Existing Auditorium Pricing Packages</h3>
        {loading ? (
          <p>Loading auditorium pricing data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Capacity</th>
                <th>Price</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((pricing) => (
                <tr key={pricing._id}>
                  <td>{pricing.Capacity}</td>
                  <td>{pricing.price}</td>
                  <td>{pricing.type}</td>
                  <td>{pricing.duration}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(pricing)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pricing._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Apricing;

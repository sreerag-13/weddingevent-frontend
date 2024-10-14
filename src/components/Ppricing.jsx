import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import your NavP component

const Ppricing = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    duration: '',
    description: '',
  });
  const [message, setMessage] = useState(''); // Success/error messages
  const [pricingList, setPricingList] = useState([]); // Hold all pricing data
  const [editingId, setEditingId] = useState(null); // Track the ID for editing
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch pricing data on component mount
  const fetchPricingData = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8082/get-pricing', {
        headers: { token },
      });
      setPricingList(response.data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
      setMessage('Error fetching pricing data.');
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
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
      setMessage('Unauthorized. Please log in.');
      return;
    }

    try {
      const response = editingId
        ? await axios.put(
            `http://localhost:8082/update-pricing/${editingId}`,
            { ...formData, userId },
            { headers: { token } }
          )
        : await axios.post(
            'http://localhost:8082/create-pricing',
            { ...formData, userId },
            { headers: { token } }
          );

      setMessage(`Pricing ${editingId ? 'updated' : 'created'} successfully!`);

      if (editingId) {
        setPricingList((prevList) =>
          prevList.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        setPricingList((prevList) => [...prevList, response.data]);
      }

      setEditingId(null);
      setFormData({ packageName: '', price: '', duration: '', description: '' });
    } catch (error) {
      console.error('Error creating/updating pricing:', error);
      setMessage('Error creating/updating pricing.');
    }
  };

  const handleEdit = (pricing) => {
    setFormData(pricing);
    setEditingId(pricing._id);
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8082/delete-pricing/${id}`, {
        headers: { token },
      });
      setMessage('Pricing deleted successfully!');
      fetchPricingData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting pricing:', error);
      setMessage('Error deleting pricing.');
    }
  };

  return (
    <div>
      <NavP /> {/* Include the navigation component */}
      <div className="container">
        <h2>Pricing Package Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="packageName" className="form-label">
                Package Name
              </label>
              <input
                type="text"
                className="form-control"
                name="packageName"
                placeholder="Enter package name"
                value={formData.packageName}
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
                placeholder="Enter package price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
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
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                placeholder="Enter package description"
                value={formData.description}
                onChange={handleChange}
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

        <h3 className="mt-5">Existing Pricing Packages</h3>
        {loading ? (
          <p>Loading pricing data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((pricing) => (
                <tr key={pricing._id}>
                  <td>{pricing.packageName}</td>
                  <td>{pricing.price}</td>
                  <td>{pricing.duration}</td>
                  <td>{pricing.description}</td>
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

export default Ppricing;

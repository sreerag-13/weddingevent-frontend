import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import your NavP component
import Navcat from './Navcat';

const Cpricing = () => {
  const [formData, setFormData] = useState({
    foodType: 'Vegetarian', // Default value set to Vegetarian
    foodItems: '',
    foodPrice: '',
    Quantity: '',
    Package: ''
  });
  const [message, setMessage] = useState(''); // Success/error messages
  const [pricingList, setPricingList] = useState([]); // Hold all pricing data
  const [editingId, setEditingId] = useState(null); // Track the ID for editing
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch pricing data on component mount
  const fetchPricingData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/get-catering-pricing'); // Update to your endpoint for catering pricing
      setPricingList(response.data);
    } catch (error) {
      console.error('Error fetching catering pricing data:', error);
      setMessage('Error fetching catering pricing data.');
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
            `http://localhost:8082/update-catering-pricing/${editingId}`,
            { ...formData, userId }
          )
        : await axios.post(
            'http://localhost:8082/create-catering-pricing',
            { ...formData, userId }
          );

      setMessage(`Catering pricing ${editingId ? 'updated' : 'created'} successfully!`);

      if (editingId) {
        setPricingList((prevList) =>
          prevList.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        setPricingList((prevList) => [...prevList, response.data]);
      }

      setEditingId(null);
      setFormData({ foodType: 'Vegetarian', foodItems: '', foodPrice: '', Quantity: '', Package: '' }); // Reset form to defaults
    } catch (error) {
      console.error('Error creating/updating catering pricing:', error);
      setMessage('Error creating/updating catering pricing.');
    }
  };

  const handleEdit = (pricing) => {
    setFormData(pricing);
    setEditingId(pricing._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/delete-catering-pricing/${id}`);
      setMessage('Catering pricing deleted successfully!');
      fetchPricingData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting catering pricing:', error);
      setMessage('Error deleting catering pricing.');
    }
  };

  return (
    <div>
      <Navcat /> {/* Include the navigation component */}
      <div className="container">
        <h2>Catering Pricing Package Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="foodType" className="form-label">
                Type of Food
              </label>
              <select
                className="form-select"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="foodItems" className="form-label">
                Food Items
              </label>
              <input
                type="text"
                className="form-control"
                name="foodItems"
                placeholder="Enter food items (comma-separated)"
                value={formData.foodItems}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="foodPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name="foodPrice"
                placeholder="Enter food price"
                value={formData.foodPrice}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                name="Quantity"
                placeholder="Enter food quantity (e.g., per person)"
                value={formData.Quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="Package" className="form-label">
                Package Type
              </label>
              <input
                type="text"
                className="form-control"
                name="Package"
                placeholder="Enter package type (e.g., Silver)"
                value={formData.Package}
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

        <h3 className="mt-5">Existing Catering Pricing Packages</h3>
        {loading ? (
          <p>Loading catering pricing data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Type of Food</th>
                <th>Food Items</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Package</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((pricing) => (
                <tr key={pricing._id}>
                  <td>{pricing.foodType}</td>
                  <td>{pricing.foodItems}</td>
                  <td>{pricing.foodPrice}</td>
                  <td>{pricing.Quantity}</td>
                  <td>{pricing.Package}</td>
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

export default Cpricing;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navcat from './Navcat';

const Cpricing = () => {
  const [formData, setFormData] = useState({
    foodType: 'Vegetarian',
    foodItems: '',
    foodPrice: '',
    Quantity: '', // Keep it as a string initially for input handling
    Package: 'Premium' // Default value for Package
  });
  const [message, setMessage] = useState('');
  const [pricingList, setPricingList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPricingData = async () => {
    const userId = sessionStorage.getItem('userId'); // Get userId from session storage
    if (!userId) {
      setMessage('Unauthorized. Please log in.');
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:8082/get-catering-pricing?userId=${userId}`); // Pass userId as a query parameter
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
    // Convert Quantity to a number
    const newValue = name === 'Quantity' ? Number(value) : value;
    setFormData({ ...formData, [name]: newValue });
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
      setFormData({ foodType: 'Vegetarian', foodItems: '', foodPrice: '', Quantity: '', Package: 'Premium' }); // Reset form
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
                type="String"
                className="form-control"
                name="Quantity"
                placeholder="Enter quantity"
                value={formData.Quantity}
                onChange={handleChange}
                min="1 per person"
                required
              />
            </div>

            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <label htmlFor="Package" className="form-label">
                Package
              </label>
              <select
                className="form-select"
                name="Package"
                value={formData.Package}
                onChange={handleChange}
                required
              >
                <option value="Premium">Premium</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Pricing' : 'Create Pricing'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ foodType: 'Vegetarian', foodItems: '', foodPrice: '', Quantity: '', Package: 'Premium' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-4">
            <h3>Catering Pricing List</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Food Type</th>
                  <th>Food Items</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Package</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pricingList.length > 0 ? (
                  pricingList.map((pricing) => (
                    <tr key={pricing._id}>
                      <td>{pricing.foodType}</td>
                      <td>{pricing.foodItems}</td>
                      <td>{pricing.foodPrice}</td>
                      <td>{pricing.Quantity}</td>
                      <td>{pricing.Package}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(pricing)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(pricing._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No pricing available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cpricing;

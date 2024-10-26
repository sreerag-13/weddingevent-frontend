import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navd from './Navd';

const Pricingd = () => {
  const [formData, setFormData] = useState({
    decorationType: 'Interior Decoration',
    Duration: '',
    Description: '',
    DecPrice: ''
  });
  const [message, setMessage] = useState('');
  const [pricingList, setPricingList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPricingData = async () => {
    const userId = sessionStorage.getItem('userId');
    try {
      const response = await axios.get('http://localhost:8082/get-decoration-pricing', { params: { userId } });
      setPricingList(response.data);
    } catch (error) {
      console.error('Error fetching decoration pricing data:', error);
      setMessage('Error fetching decoration pricing data.');
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
        ? await axios.put(`http://localhost:8082/update-decoration-pricing/${editingId}`, { ...formData, userId })
        : await axios.post('http://localhost:8082/create-decoration-pricing', { ...formData, userId });

      setMessage(`Decoration pricing ${editingId ? 'updated' : 'created'} successfully!`);

      if (editingId) {
        setPricingList((prevList) =>
          prevList.map((item) => (item._id === editingId ? response.data : item))
        );
      } else {
        setPricingList((prevList) => [...prevList, response.data]);
      }

      setEditingId(null);
      setFormData({ decorationType: 'Interior Decoration', Duration: '', Description: '', DecPrice: '' });
    } catch (error) {
      console.error('Error creating/updating decoration pricing:', error);
      setMessage('Error creating/updating decoration pricing.');
    }
  };

  const handleEdit = (pricing) => {
    setFormData(pricing);
    setEditingId(pricing._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/delete-decoration-pricing/${id}`);
      setMessage('Decoration pricing deleted successfully!');
      fetchPricingData();
    } catch (error) {
      console.error('Error deleting decoration pricing:', error);
      setMessage('Error deleting decoration pricing.');
    }
  };

  return (
    <div>
      <Navd />
      <div className="container">
        <h2>Decoration Pricing Package Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col col-12 col-sm-6">
              <label htmlFor="decorationType" className="form-label">Type of Decoration</label>
              <select className="form-select" name="decorationType" value={formData.decorationType} onChange={handleChange} required>
                <option value="Interior Decoration">Interior Decoration</option>
                <option value="Outdoor Decoration">Outdoor Decoration</option>
                <option value="Banquet Decoration">Banquet Decoration</option>
              </select>
            </div>

            <div className="col col-12 col-sm-6">
              <label htmlFor="Duration" className="form-label">Duration</label>
              <input type="text" className="form-control" name="Duration" value={formData.Duration} onChange={handleChange} required />
            </div>

            <div className="col col-12 col-sm-6">
              <label htmlFor="Description" className="form-label">Description</label>
              <input type="text" className="form-control" name="Description" value={formData.Description} onChange={handleChange} required />
            </div>

            <div className="col col-12 col-sm-6">
              <label htmlFor="DecPrice" className="form-label">Price</label>
              <input type="number" className="form-control" name="DecPrice" value={formData.DecPrice} onChange={handleChange} required />
            </div>

            <div className="col col-12 col-sm-6">
              <button type="submit" className="btn btn-success w-100">
                {editingId ? 'Update Package' : 'Register Package'}
              </button>
            </div>

            <div className="col col-12 col-sm-6">
              <a href="/" className="btn btn-secondary w-100">Home</a>
            </div>
          </div>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}

        <h3 className="mt-5">Existing Decoration Pricing Packages</h3>
        {loading ? (
          <p>Loading decoration pricing data...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Type of Decoration</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((pricing) => (
                <tr key={pricing._id}>
                  <td>{pricing.decorationType}</td>
                  <td>{pricing.Duration}</td>
                  <td>{pricing.Description}</td>
                  <td>{pricing.DecPrice}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(pricing)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pricing._id)}>Delete</button>
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

export default Pricingd;

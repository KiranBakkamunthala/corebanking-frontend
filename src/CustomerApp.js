import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8081';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCa2lyYW4iLCJpYXQiOjE3NTM4MjYyMzgsImV4cCI6MTc1MzgyNjI5OH0.WTYc0lQWUUikTfwbcs1FKmtSjx_pd3XbhkDZHAOnUpw'; // Replace with your real JWT token

function CustomerApp() {
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const headers = {
    Authorization: `Bearer ${JWT_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const createCustomer = async () => {
    if (!name.trim()) {
      setError('Customer name is required');
      return;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
    setError('Only alphabets are allowed in customer name');
    return;
  }

    try {
      const res = await axios.post(`${API_BASE}/customers/create`, { name }, { headers });
      setResult(JSON.stringify(res.data, null, 2));
      setError('');
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) {
        setError('Invalid customer data');
      } else if (status === 409) {
        setError('Customer already exists');
      } else if (status === 401) {
        setError('Unauthorized request - check your token');
      } else {
        setError('Error creating customer');
      }
      setResult('');
    }
  };

  const getCustomer = async () => {
    if (!customerId.trim()) {
      setError('Customer ID is required');
      return;
    }

    if (!/^\d+$/.test(customerId)) {
    setError('Customer ID must be a number');
    return;
  }

    try {
      const res = await axios.get(`${API_BASE}/customers/${customerId}`, { headers });
      setResult(JSON.stringify(res.data, null, 2));
      setError('');
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        setError('Customer ID not available');
      } else if (status === 401) {
        setError('Unauthorized request - check your token');
      } else {
        setError(err.response?.data?.message || 'Error retrieving customer');
      }
      setResult('');
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ textAlign: 'center', color: '#007bff' }}>Welcome to CoreBanking Application</h1>
        <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '2rem' }}>Please create or inquire customer</p>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#343a40' }}>Create Customer</h3>
          <input
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button
            onClick={createCustomer}
            style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Create
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#343a40' }}>Inquire Customer</h3>
          <input
            type="text"
            placeholder="Enter customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button
            onClick={getCustomer}
            style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Get Details
          </button>
        </div>

        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

        {result && (
          <div style={{
            marginTop: '1rem',
            background: '#e9ecef',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}>
            <strong>Response:</strong>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerApp;

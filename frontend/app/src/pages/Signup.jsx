import React, { useState } from 'react';

const SignupPage = ({setForm}) => {
  const initialFormData = {
    firstname: '',
    lastname: '',
    email_address: '',
    dob: '',
    gender: '',
    phone_number: '',
    nrc: '',
    marital_status: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  
 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('User created successfully!');
        setFormData(initialFormData);  // Reset the form after successful submission
      } else {
        setError(data.detail || 'Signup failed');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email_address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.email_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">NRC</label>
            <input
              type="text"
              name="nrc"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.nrc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <input
              type="text"
              name="marital_status"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value={formData.marital_status}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
    
        </form>
        <button className='mt-3'>Already Have Account? <strong className='underline' onClick={()=>setForm()}>Login</strong></button>
      </div>
    </div>
  );
};

export default SignupPage;

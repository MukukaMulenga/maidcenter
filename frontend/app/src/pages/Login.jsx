import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { get_data, set_profile } from '../components/state/actionCreator';
import { useDispatch } from 'react-redux';

const LoginPage = ({ setForm }) => {
    const dispatch = useDispatch()
    const { role } = useParams(); // Extract role from URL parameters
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email_address: '', password: '' });

    const navigate = useNavigate();

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error message
        setError('');

        // Basic validation
        if (!formData.email_address || !formData.password) {
            setError('Please fill in both fields');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            dispatch(set_profile(data.user))
            const role = data.user.isAdmin ? 'admin' : 'user';

            if (response.ok) {
              sessionStorage.setItem('userRole', role);
              sessionStorage.setItem(`token_${role}`, data.access_token); // Store token by role
              sessionStorage.setItem(`profile_${role}`, JSON.stringify(data.user)); // Store profile by role
              navigate('/dashbord');
            } else {
                setError(data.detail || 'Login failed');
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
                <h1 className="text-2xl font-bold mb-6">Login as {role}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email_address"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.email_address}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete='true'
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={formData.password}
                            onChange={handleChanges}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md shadow hover:bg-indigo-700"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <button className='mt-3'>
                    Don't Have An Account? <strong className='underline' onClick={() => setForm()}>Signup</strong>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;

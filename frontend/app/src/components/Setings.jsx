import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

const Settings = ({ profile, onUpdateProfile }) => {
  const [image, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    firstname: profile.firstname || '',
    lastname: profile.lastname || '',
    email_address: profile.email_address || '',
    phone_number: profile.phone_number || '',
    nrc: profile.nrc || '',
    gender: profile.gender || '',
    marital_status: profile.marital_status || '',
    dob: profile.dob || '',
    image_url: profile.image_url || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image_url: imageUrl,
      });
      setImageUrl(imageUrl);  // Update the displayed image
    } else {
      alert('Error...');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
  };

  const fetchImage = async (img) => {
    const res = await fetch('http://localhost:8000/uploads/' + img);
    if (res.ok) {
      setImageUrl(res.url);
    }
  };

  useEffect(() => {
    fetchImage(profile.image_url);
  }, [profile.image_url]);

  return (
    <div className='flex'>
      <div className='w-[40%] h-[84vh] p-6'>
        <div className='flex justify-center mb-4'>
          {image ? (
            <img
              src={image}
              alt="Profile"
              className='w-32 h-32 rounded-full border border-gray-300 object-cover'
            />
          ) : (
            <div className='w-32 h-32 rounded-full bg-gray-400 flex justify-center items-center'>
              <FaUser className='text-gray-300 text-3xl' />
            </div>
          )}
        </div>

        {/* Green upload button */}
        <div className='flex justify-center mb-4'>
          <label htmlFor="imageUpload" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600">
            Upload
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className='space-y-4'>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder='Firstname'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder='Lastname'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder='Phone'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            placeholder='Email'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder='Date of Birth'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            name="marital_status"
            value={formData.marital_status}
            onChange={handleChange}
            placeholder='Status'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder='Gender'
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
      <div className='w-[60%] h-[84vh] border-s'></div>
    </div>
  );
};

export default Settings;

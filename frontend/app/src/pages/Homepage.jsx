import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'tailwindcss/tailwind.css';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const [selectedRole, setSelectedRole] = useState(''); // State to store selected role
  const navigate = useNavigate(); // Initialize navigate

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowDropdown(false); // Hide dropdown after selection
    navigate(`/authpage/${role}`); // Redirect based on selected role
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col justify-between`}>
      
      {/* Header Section */}
      <header className="shadow-md py-4 px-8">
        <nav className="flex justify-between items-center">
          <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-yellow-400' : 'text-blue-600'} italic`}>
            Blue-Ribbon Maid Center
          </h1>
          <div className="relative">
            <button
              className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={toggleTheme}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
            >
              Login
            </button>
            {showDropdown && ( // Conditionally render dropdown
              <div className="absolute right-0 mt-2 bg-white text-gray-900 rounded shadow-lg z-10">
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  onClick={() => handleRoleSelect('admin')}
                >
                  Admin
                </button>
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  onClick={() => handleRoleSelect('user')}
                >
                  User
                </button>
              </div>
            )}
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Navigation
            </button>
          </div>
        </nav>
      </header>

      {/* About Section */}
      <section className="text-center py-12 px-4 md:px-24">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`}>
          About Us
        </h2>
        <p className="text-lg leading-relaxed">
          Blue-Ribbon Maid Center is your trusted partner for providing top-tier, professional maid services. Whether you need
          help with cleaning, laundry, or general home management, our skilled team is ready to assist. We prioritize customer
          satisfaction and maintain the highest standards of service. Our maids are vetted, trained, and dedicated to making your
          home sparkle.
        </p>
      </section>

      {/* Carousel Section */}
      <div className="flex-grow">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={3000}
          className="my-8"
        >
          <div className="relative">
            <img src="https://via.placeholder.com/1200x500.png?text=Slide+1" alt="Slide 1" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Beautiful Landscape 1</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://via.placeholder.com/1200x500.png?text=Slide+2" alt="Slide 2" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Beautiful Landscape 2</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://via.placeholder.com/1200x500.png?text=Slide+3" alt="Slide 3" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Beautiful Landscape 3</p>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2024 Blue-Ribbon Maid Center. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

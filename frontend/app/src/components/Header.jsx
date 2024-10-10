import React, { useEffect, useState } from 'react';
import { FaBell, FaComment, FaFileAlt, FaSearch, FaUser } from 'react-icons/fa';

function Header({
  detail,
  handleMessageClick,
  handleNotificationClick,
  messageIndicator,
  notificationIndicator,
  getMessages
}) {
  const [imageUrl, setImageUrl] = useState('');
 

  // Establish WebSocket connection
 
  // Fetch image URL
  const fetchImage = async () => {
    const res = await fetch('http://localhost:8000/uploads/' + detail.image_url);
    if (res.ok) {
      setImageUrl(res.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleMessages = ()=>{
    handleMessageClick()
    getMessages()
  }

  return (
    <div className='ms-[241px] bg-white h-[70px] fixed top-5 w-[1490px] flex items-center space-x-[400px]'>
      <div className='flex space-x-1 bg-gray-100 w-[300px] h-[35px] ms-5 my-3 px-3 rounded-2xl '>
        <FaSearch className='translate-y-3 text-gray-300 me-3' />
        <input
          type="text"
          placeholder='search for'
          className='w-full h-full bg-transparent'
          style={{ outline: 'none' }}
        />
      </div>
      <div className='flex justify-center items-center py-3 bg-gray-100 w-[130px] h-[35px] rounded-md'>
        <div className='w-[40px] h-[28px] bg-gray-transparent flex justify-center items-center '>
          <FaBell
            className='text-gray-300'
            onClick={handleNotificationClick}
          />
          <div className={notificationIndicator ? 'w-[7px] h-[7px] rounded-full fixed ms-3 mb-3 bg-red-500' : 'w-[7px] h-[7px] rounded-full fixed ms-3 mb-3 bg-gray-100'}></div>
        </div>
        <div className='w-[38px] h-[28px] bg-gray-transparent border-s border-e flex justify-center items-center '>
          <FaComment
            className='text-gray-300'
            onClick={()=>handleMessages()}
          />
          <div className={messageIndicator ? ' w-[5px] h-[5px] rounded-full fixed ms-5 mb-4 bg-red-500' : 'w-[7px] h-[7px] rounded-full fixed ms-5 mb-3 bg-gray-100'}></div>
        </div>
        <div className='w-[40px] h-[28px] bg-gray-transparent flex justify-center items-center '>
          <FaFileAlt className='text-gray-300' />
        </div>
      </div>
      <div className='flex justify-center items-center space-x-2'>
        {
          detail.image_url ? <img src={imageUrl} alt="" className='h-[40px] w-[40px] rounded-full' /> : <div className='h-[40px] w-[40px] justify-center flex items-center rounded-full bg-gray-100'><FaUser className='text-gray-300' /></div>
        }
        <h3>{detail.firstname}</h3>
      </div>

     
    </div>
  );
}

export default Header;

import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Settings from '../components/Setings'
import { useSelector,useDispatch } from 'react-redux'
import Userstable from '../components/Userstable'
import JobsTable from '../components/Jobs'
import ApplicationsTable from '../../ApplicationsTable'
import Home from '../components/Home'
import { get_messages } from '../components/state/actionCreator'
import Modal from 'react-modal';
import { BiDotsHorizontalRounded } from 'react-icons/bi';  // Import the icon
import { formatDistanceToNow, format } from 'date-fns';





const Dashbord = () => {
  const dispatch = useDispatch()
  const [n,setN] = useState(0)
  const [view,setView] = useState('home')
  const [isOpenMessageModal,setIsOpenMessageModal] = useState(false)
  const [isOpenNotificationModal,setIsNotification] =useState(false)
  const [notifications, setNotifications] = useState([]);
  const [messageIndicator,setMessageIndicator] = useState(false)
  const [notificationIndicator,setNotificationIndicator]  = useState(false)
  const [messages,setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  

  

  useEffect(()=>{
   
  },[])


  // const token = localStorage.getItem('token')
  const prof = localStorage.getItem('profile')
  // const profile = JSON.parse(prof)


  const userRole = sessionStorage.getItem('userRole');
  const profileString = sessionStorage.getItem(`profile_${userRole}`)
  const profile = profileString ? JSON.parse(profileString) : null;


  const handleNotificationClick = () => {
    setIsNotification(!isOpenNotificationModal); // Hide notification dot
    setNotificationIndicator(false)
  };

  // Handle opening message modal
  const handleMessageClick = () => {
    setIsOpenMessageModal(!isOpenMessageModal);
    setMessageIndicator(false)
  };


  const handleApproveClick = () => {
    setMessageModalOpen(true);
  };

  // Handle sending the message
  
  const changeView = (v)=>{
    setView(v)
    setN(1)
  }

  useEffect(()=>{
    setView('home')
    
  },[])

  useEffect(()=>{
    
  },[])


  useEffect(()=>{
    setN(1)
    
  },[n])
 
  const handleUpdateProfile = async (updatedProfile) => {
  
      const response = await fetch(`http://localhost:8000/users/update/${profile.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: updatedProfile.firstname,
          lastname: updatedProfile.lastname,
          email_address: updatedProfile.email_address,
          gender: updatedProfile.gender,
          marital_status: updatedProfile.marital_status,
          dob: updatedProfile.dob,
          phone_number: updatedProfile.phone_number,
          nrc: updatedProfile.nrc,
          // Exclude isAdmin since it's not editable
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

    } 
  const getMessages = ()=>{
    const socketUrl = `ws://localhost:8000/ws/messages/${profile.user_id}`;  
    const websocket = new WebSocket(socketUrl);
    websocket.onopen = () => {
      console.log("WebSocket connection opened.");
      const messageToSend = {
        new_message: "Hello from the client!"  // Example JSON message
      };
      websocket.send(JSON.stringify(messageToSend));
    };
    websocket.onmessage = (event) => {
      const incomingMessages = JSON.parse(event.data);
    
      setMessages((prevMessages) => {
        // Filter out the messages that are already in the state
        const newMessages = incomingMessages.filter((newMessage) =>
          !prevMessages.some((existingMessage) => existingMessage.message_id === newMessage.message_id)
        );
    
        // If there are new messages, update the state and set the indicator
        if (newMessages.length > 0) {
          setMessageIndicator(true);
          return [...prevMessages, ...newMessages];
        }
    
        // If no new messages, return the previous state
        return prevMessages;
      });
    };
  }

  useEffect(()=>{
   getMessages()
  },[])

  const truncateMessage = (message, wordLimit) => {
    const words = message.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ' : message;
  };

  const messageClick = (message) => {
    setSelectedMessage(message);
    setIsOpen(true); // Open the message box
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    // Use date-fns to format the timestamp
    const distance = formatDistanceToNow(messageDate, { addSuffix: true });
    
    // Return formatted date if more than a day old
    if (now - messageDate > 86400000) {
      return format(messageDate, 'PP'); // For example: 'Oct 7th, 2024'
    }
    
    return distance; // Returns 'now', '5 minutes ago', etc.
  };

  return (
    <>
     
     <div className='dashboard pe-10'>
      <Sidebar changePage={changeView} detail={profile}/>
      <div className='me-10'><Header detail={profile} handleMessageClick={handleMessageClick} handleNotificationClick={handleNotificationClick} notifications={notifications} messages={messages} messageIndicator={messageIndicator} notificationIndicator={notificationIndicator} getMessages={getMessages}/></div>
      <main className='main-content bg-white shadow-lg '>
      {
        view === 'home'&&  <div className='home'>
          <Home />
        </div>
      }
      {
        view === 'users'&& <div className='users'>
        <Userstable />
        </div>
      }
      {
        view === 'applications'&& <div className='applications'>
        <ApplicationsTable user={profile} />
        </div>
      }
      {
        view === 'jobs'&& <div className='jobs'>
        <JobsTable detail={profile}/>
        </div>
      }
      {
        view === 'reports'&& <div className='reports'>
        reports
        </div>
      }
      {
        view === 'setings'&& <div className='setings bg-white'  >
        <Settings profile={profile} onUpdateProfile={handleUpdateProfile}/>
        </div>
      }
       {/* Notification Modal */}
       {isOpenNotificationModal && (
        <div className="fixed top-[80px]  left-[720px] bg-gray-500 text-gray-300 shadow-md p-4 w-[300px] rounded-lg">
          <h3 className="font-bold">Notifications</h3>
          <ul>
            {notifications.length > 0 ? notifications.map(notification => (
              <li key={notification.id} className="py-2 border-b" >{notification.text}</li>
            )) : <li>No new notifications</li>}
          </ul>
        </div>
      )}

      {/* Message Modal */}
      <Modal
      isOpen={isOpenMessageModal}
      onRequestClose={() => setIsOpenMessageModal(false)}  // Close modal on outside click or escape key
      className="fixed top-[80px] left-[900px] bg-black text-gray-300 shadow-md p-4 w-[400px] h-64  overflow-y-scroll scrollbar-hide rounded-lg outline-none"
      overlayClassName="fixed inset-0 bg-white bg-opacity-50"  // Optional overlay styling
    >
      <h3 className="font-bold ">Messages</h3>
      <ul>
        {messages.length > 0 ? (
          messages
            .filter(message => message.user_id === profile.user_id)
            .map((message) => (
              <li  key={message.message_id} className="py-2 cursor-pointer   text-gray-300" onClick={()=>messageClick(message)}>
                {truncateMessage(message.actual_message, 4)}  {/* Show first 5 words */}
                <span className="text-gray-500 text-sm ml-4">{formatTimestamp(message.timestamp)}</span> {/* Display timestamp */}
                <BiDotsHorizontalRounded className="inline ml-2" />  {/* Add the three dots icon */}
              </li>
            ))
        ) : (
          <li>No new messages</li>
        )}
      </ul>
    </Modal>
    {isOpen && (
      <div className="fixed right-0 top-0 h-full w-96 bg-gray-800 bg-opacity-90 text-white p-4 transform transition-transform duration-300 ease-in-out z-50">
        <h2 className="font-bold text-xl bg-black p-2 rounded-lg">Admin</h2>
        <p className="mt-2">{selectedMessage.actual_message}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
          onClick={() => setIsOpen(false)} // Close the message box
        >
          Close
        </button>
      </div>
    )}

    
      </main>
    </div>
    </>
   
  )
}

export default Dashbord

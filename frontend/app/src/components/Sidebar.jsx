import React, { useEffect } from 'react'
import { FaCog, FaCogs, FaHome, FaHouseDamage, FaHSquare, FaQq, FaRenren, FaTachometerAlt, FaTasks, FaUncharted, FaUsersCog, FaUserTie, FaWpforms } from 'react-icons/fa'

const Sidebar = ({changePage,detail}) => {
   
    return (
        <aside className='sidebar shadow-md'>
            <div className='p-2 items-center justify-center'>
                <div className='flex  items-center mx-4 my-3 mb-5 rounded-xl shadow justify-center'>
                <FaRenren className='me-2 text-red-700 text-xl'/>
                <h3 className='font-bold text-[16px]'>Maid center</h3>
                </div>
                <h2 className='font-medium text-gray-400 text-xs mb-3 mx-4'>Menu</h2>
                <div className='bg-gradient-to-r from-blue-400 mx-4 to-indigo-400 h-[50px] rounded-lg items-center flex justify-center text-white'>
                    <FaTachometerAlt className='me-2 text-white'/>
                    <h3 className=' text-md font-thin'>Dashbord</h3>
                </div>
            </div>
            <ul>
                <div className='flex items-center ms-[75px]' onClick={()=>changePage('home')}>
                    <FaHome className='me-2 text-gray-400 text-lg'/>
                    <li><a href="#">Home</a></li>
                </div>
            {
                detail.isAdmin ?  <div className='flex items-center ms-[75px]' onClick={()=>changePage('users')}>
                <FaUsersCog className='me-2 text-gray-400 text-lg'/>
                <li><a href="#">Users</a></li>
                </div> : <div></div>
            }
                <div className='flex items-center ms-[75px]' onClick={()=>changePage('applications')}>
                    <FaWpforms className='me-2 text-gray-400 text-lg'/>
                    <li><a href="#">Applications</a></li>
                </div>
                <div className='flex items-center ms-[75px]' onClick={()=>changePage('jobs')}>
                    <FaUserTie className='me-2 text-gray-400 text-lg'/>
                    <li><a href="#">Jobs</a></li>
                </div>
            {
                detail.isAdmin ?  <div className='flex items-center ms-[75px]' onClick={()=>changePage('reports')}>
                <FaTasks className='me-2 text-gray-400 text-lg'/>
                <li><a href="#">Reports</a></li>
                </div> : <div></div>
            }
                <div className='flex items-center ms-[75px]' onClick={()=>changePage('setings')}>
                    <FaCog className='me-2 text-gray-400 text-lg'/>
                    <li><a href="#">Settings</a></li>
                </div>
            </ul>
        </aside>
    )
}
``
export default Sidebar

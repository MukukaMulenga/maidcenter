// Home.jsx
import React from 'react';

const Home = () => {
  const data = [
    {
      title: 'Users',
      description: 'Manage all users registered in the system.',
      bgColor: 'bg-blue-200',
    },
    {
      title: 'Jobs',
      description: 'View and manage job listings for maids.',
      bgColor: 'bg-green-200',
    },
    {
      title: 'Conditions',
      description: 'Check the conditions of service and user agreements.',
      bgColor: 'bg-yellow-200',
    },
    {
      title: 'Payment Services',
      description: 'Manage payment services and transaction history.',
      bgColor: 'bg-red-200',
    },
  ];

  return (
    <div className="p-5 ">
      <h1 className="text-xl font-bold mb-5">Maid Center Dashboard</h1>
      <div className='flex space-x-[50px]'>
      {
        data.map((info)=>(
          <div className='gridBox'>
            {info.title}
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default Home;

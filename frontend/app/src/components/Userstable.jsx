import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/users');
      const data = await response.json();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/users/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filtered = users.filter(user =>
      user.firstname.toLowerCase().includes(value) ||
      user.lastname.toLowerCase().includes(value) ||
      user.email_address.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/users/update/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: selectedUser.firstname,
          lastname: selectedUser.lastname,
          email_address: selectedUser.email_address,
          gender: selectedUser.gender,
          isAdmin: selectedUser.isAdmin, 
        }),
      });
      console.log(typeof(selectedUser.isAdmin))
      if (response.ok) {
        fetchUsers();
        setModalOpen(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  useEffect(() => {
    fetchUsers();
    
  }, []);

  const columns = [
    {
      name: 'First Name',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email_address,
    },
    {
      name: 'Phone',
      selector: row => row.phone_number,
    },
    {
      name: 'Gender',
      selector: row => row.gender,
    },
    {
      name: 'Admin Status',
      selector: row => (row.isAdmin ? 'Admin' : 'User'),
    },
    {
      name: 'Action',
      cell: row => (
        <div className="flex space-x-2">
          <FaEye
            className="text-blue-600 cursor-pointer"
            onClick={() => handleUpdateClick(row)}
          />
          <FaTrash
            className="text-red-600 cursor-pointer"
            onClick={() => deleteUser(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-[85vh] p-8`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 border rounded"
          style={{ width: '300px' }}
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        theme={darkMode ? 'dark' : 'default'}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: darkMode ? '#1F2937' : '#F3F4F6',
              color: darkMode ? '#fff' : '#000',
            },
          },
          rows: {
            style: {
              backgroundColor: darkMode ? '#374151' : '#fff',
              color: darkMode ? '#fff' : '#000',
            },
          },
        }}
      />

      {/* Modal for updating user */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  value={selectedUser.firstname}
                  onChange={(e) => setSelectedUser({ ...selectedUser, firstname: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  value={selectedUser.lastname}
                  onChange={(e) => setSelectedUser({ ...selectedUser, lastname: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded w-full"
                  value={selectedUser.email_address}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email_address: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  className="px-4 py-2 border rounded w-full"
                  value={selectedUser.gender}
                  onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedUser.isAdmin}
                    onChange={(e) => setSelectedUser({ ...selectedUser, isAdmin: e.target.checked })}
                  />
                  <span className="ml-2">Admin</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;

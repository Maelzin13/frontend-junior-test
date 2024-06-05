import React, { useEffect, useState } from 'react';

import UserMap from './components/UserMap';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { fetchUsers } from './services/userService';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUsers();
      setUsers(response);
      setFilteredUsers(response);
    };
    fetchData();
  }, []);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    if (filter === '') {
      setFilteredUsers([...users, user]);
    }
  };

  const handleMarkerClick = (user) => {
    alert(`Usuário: ${user.name}\nEmail: ${user.email}\nCidade: ${user.address.city}`);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(value) || 
      user.address.city.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };

  const handleClearFilter = () => {
    setFilter('');
    setFilteredUsers(users);
  };

  return (
    <div className="container mx-auto p-4 md:p-12 flex flex-col"> 
      <div className="mt-6 flex flex-col md:flex-row justify-start">
        <input 
          type="text" 
          placeholder="Filtrar por nome ou cidade" 
          value={filter} 
          onChange={handleFilterChange} 
          className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {filter && ( 
          <button 
            onClick={handleClearFilter} 
            className="bg-blue-500 text-white p-2 rounded-lg mt-2 md:mt-0 md:ml-2"
          >
            Limpar
          </button>
        )}
      </div>
      <div className="mt-12 flex-grow">
        <UserMap users={filteredUsers} onMarkerClick={handleMarkerClick} />
      </div>
      <div className="mt-12 flex flex-col md:flex-row">
        <div className="mr-0 md:mr-4 w-full md:w-1/2">
          <UserList users={users} filteredUsers={filteredUsers} />
        </div>
        <div className="mt-6 w-full md:w-1/2">
          <UserForm onAddUser={handleAddUser} />
        </div>
      </div>
    </div>
  );
};

export default App;

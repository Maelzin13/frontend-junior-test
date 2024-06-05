import React, { useState, useEffect } from 'react';

const UserList = ({ users, filteredUsers }) => {
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  
  useEffect(() => {
    const newSortedUsers = [...filteredUsers].sort((a, b) => {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setSortedUsers(newSortedUsers);
  }, [filteredUsers, sortDirection]);

  const sortUsers = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const usersToDisplay = filteredUsers.length > 0 ? sortedUsers : users;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-3">Nome <button onClick={sortUsers}>{sortDirection === 'asc' ? '↑' : '↓'}</button></th>
              <th className="p-3">Email</th>
              <th className="p-3">Cidade</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map(user => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

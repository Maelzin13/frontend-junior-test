import React, { useState } from 'react';
import Alert from '@mui/material/Alert';


const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [erroMensage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !email || !city ||  !lat || !lng){
      setErrorMessage("Por Favor, preencha todos os campos.")
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      address: {
        city,
        geo: {
          lat,
          lng,
        },
      },
    };
    onAddUser(newUser);
    setName('');
    setEmail('');
    setCity('');
    setLat('');
    setLng('');
    setSuccessMessage('Usuário adicionado com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      {successMessage && (
        <Alert  severity="success">
          {successMessage}
        </Alert>
      )}
      {erroMensage && (
        <Alert  severity="success">
          {erroMensage}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Adicionar Novo Usuário</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Adicionar</button>
      </form>
    </div>
  );
};

export default UserForm;

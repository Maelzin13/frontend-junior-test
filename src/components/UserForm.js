import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

const UserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Array de campos para verificação
    const fields = [name, email, city, lat, lng];

    // Verifica se algum campo está vazio, nulo ou indefinido
    if (fields.some(field => field === '' || field === null || field === undefined)) {
      setErrorMessage('Por favor, preencha todos os campos corretamente.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    // Converte lat e lng para números
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    // Verifica se lat e lng são números válidos
    if (isNaN(latNum) || isNaN(lngNum)) {
      setErrorMessage('Por favor, insira valores numéricos válidos para latitude e longitude.');
      setTimeout(() => {
        setErrorMessage('');
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
          lat: latNum,
          lng: lngNum,
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
        <Alert severity="success">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error">
          {errorMessage}
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

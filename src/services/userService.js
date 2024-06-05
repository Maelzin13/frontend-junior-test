import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const addUserService = (users, newUser) => {
  return [...users, newUser];
};

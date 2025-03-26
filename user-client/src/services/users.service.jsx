import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

const getUsers = async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

// ... other methods remain the same

export default { getUsers /*, other methods */ };
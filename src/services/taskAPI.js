import axios from 'axios';

// Assuming you store the token in localStorage or state after user logs in
const API = axios.create({ baseURL: 'http://localhost:5000/api/tasks' });

const getAuthToken = () => {
  return localStorage.getItem('token'); // Or use a global state or context if you store it differently
};

export const fetchTasks = (params) => {
  return API.get('/', {
    params,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Attach token to the header
    },
  });
};

export const createTask = (task) => {
  return API.post('/', task, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Attach token to the header
    },
  });
};

export const updateTask = (id, updatedTask) => {
  return API.put(`/${id}`, updatedTask, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Attach token to the header
    },
  });
};

export const deleteTask = (id) => {
  return API.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // Attach token to the header
    },
  });
};



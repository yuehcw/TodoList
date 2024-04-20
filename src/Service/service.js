import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTodo = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

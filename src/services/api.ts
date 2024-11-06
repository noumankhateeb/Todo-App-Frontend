import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const signupUser = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/api/user/signup`, { email, password });
};

export const loginUser = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/api/user/login`, { email, password });
};

export const addTodoCall = async (url: string, todo: { title: string; text: string; completed: boolean }, config: object) => {
    return await axios.post(`${API_URL}${url}`, todo, config);
};

export const fetchTodosCall = async (url: string, config: object) => {
    return await axios.get(`${API_URL}${url}`, config);
};

export const deleteTodoCall = async (url: string, config: object) => {
    return await axios.delete(`${API_URL}${url}`, config);
};

export const updateTodoCall = async (url: string, todo: { title: string; text: string; completed: boolean }, config: object) => {
    return await axios.put(`${API_URL}${url}`, todo, config);
};
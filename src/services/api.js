import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "https://interview-prep-dashboard-2.onrender.com";
const API_URL = `${BASE_URL}/api/problems`;

export const getProblems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProblem = async (problem) => {
  const response = await axios.post(API_URL, problem);
  return response.data;
};

export const deleteProblem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
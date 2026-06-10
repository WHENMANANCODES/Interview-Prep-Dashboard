import axios from 'axios';

const API_URL =  "http://localhost:5000/api/problems";

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
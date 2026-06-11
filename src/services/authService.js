import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://interview-prep-dashboard-2.onrender.com";
const API_URL = `${BASE_URL}/api/auth`;

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    // Backend se mila hua user aur token data LocalStorage mein save hoga
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = { login, register, logout };
export default authService;
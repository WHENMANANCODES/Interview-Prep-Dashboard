import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://preptrack-backend-am0b.onrender.com";
const API_URL = `${BASE_URL}/api/auth`;

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  if (response.data.token) {
    //  1. User ki details ko string bana kar save kiya
    localStorage.setItem("user", JSON.stringify(response.data.user || response.data));
    
    //  2. ASLI FIX: Token ko alag se save kiya taaki hamara interceptor ise direct utha sake!
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  
  if (response.data.token) {
    // Same login wala kaam register par bhi kiya
    localStorage.setItem("user", JSON.stringify(response.data.user || response.data));
    localStorage.setItem("token", response.data.token); // Token alag se save kiya
  }
  return response.data;
};

const logout = () => {
  // Logout karte waqt dono cheezon ko saaf kar do
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // Token bhi delete karo
};

const authService = { login, register, logout };
export default authService;
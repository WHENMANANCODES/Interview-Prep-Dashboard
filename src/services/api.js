import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "https://preptrack-backend-am0b.onrender.com";
const API_URL = `${BASE_URL}/api/problems`;

// 🎯 Axios ka custom instance banaya jisme automatic token jayega
const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  (config) => {
    // ⚠️ YAHA DHYAN DO: Agar authService mein tumne poora object "user" mein dala hai, 
    // toh hum token dono jagah se dhoondhne ki koshish karenge taaki galti na ho!
    let token = localStorage.getItem('token');
    
    if (!token) {
      const userObj = localStorage.getItem('user');
      if (userObj) {
        const parsed = JSON.parse(userObj);
        token = parsed.token; // Agar token user object ke andar chhupa ho
      }
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🎯 In functions mein direct 'axios' nahi, balki 'apiInstance' use hona compulsory hai!
export const getProblems = async () => {
  const response = await apiInstance.get(API_URL); 
  return response.data;
};

export const addProblem = async (problem) => {
  const response = await apiInstance.post(API_URL, problem); 
  return response.data;
};

export const deleteProblem = async (id) => {
  await apiInstance.delete(`${API_URL}/${id}`); 
};
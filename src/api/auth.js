import api from "./axios";

export const signup = (data) =>
  api.post("/auth/signup", data);

export const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    console.log('Login response:', res.data);
    const token = res.data.access_token || res.data.token;
    if (token) {
      localStorage.setItem("token", token);
      console.log('Token saved:', token);
    } else {
      console.error('No token in response:', res.data);
    }
    return res.data;
  } catch (error) {
    if (error.message === 'Network Error') {
      throw new Error('Cannot connect to server. Please ensure the backend is running on http://127.0.0.1:8000');
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

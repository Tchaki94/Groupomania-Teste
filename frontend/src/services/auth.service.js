import axios from "axios";

const API_URL = "http://localhost:3000/api/user/";

const register = (name, email, password, image) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
    image,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")); //obtenir le user actuel
};



export default {
  register,
  login,
  logout,
  getCurrentUser,
};
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/user/";

const getPublicContent = () => { //contenu users
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const getUserBoard = () => { // récupérer le users via email
  return axios.get(API_URL +  { headers: authHeader() }); 
};

const getUserById = (id) => { // récupérer le users via id
  return axios.get(API_URL +  id ,{ headers: authHeader() }); 
};

const deleteUser = (id) => { // suppression via ID
  return axios.delete(API_URL + 'delete/' + id ,  { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getUserById,
  deleteUser,
};
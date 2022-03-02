import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/post/";

const getAllPost = () => { //recuperer tout les post
    return axios.get(API_URL + "all", { headers: authHeader() });
}

const getOnePost = () => { // recuperer 1 post
    return axios.get(API_URL +  { headers: authHeader() });
}

const deletePost = (id) => { // suppression via ID
    return axios.delete(API_URL + 'delete/' + id ,  { headers: authHeader() });
};

export default {
    getAllPost,
    getOnePost,
    deletePost
};
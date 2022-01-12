import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/post/";

const getAllPost = () => { //recuperer tout les post

    return axios.get(API_URL + "all", { headers: authHeader() });
}

const getOnePost = () => { // recuperer 1 post

    return axios.get(API_URL +  { headers: authHeader() });
}

const getDeletePost = () => { // suprimer un post

    return axios.get(API_URL + "delete", { headers: authHeader() })
}

export default {
    getAllPost,
    getDeletePost,
    getOnePost
};
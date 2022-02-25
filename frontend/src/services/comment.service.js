import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/comment";

const getComment = () => {
    return axios.get(API_URL + "/comment", { headers: authHeader() });
}

const getAllComment = () => {
    return axios.get(API_URL + "/all", { headers: authHeader() });
}

const getOneComment = (id) => {
    return axios.get(API_URL + "/id", { headers: authHeader() });
}

const creatComment = (comment) => {
    return axios.post(API_URL , comment ,{ headers: authHeader() });
}

const deleteComment = (id) => { // suppression via ID
    return axios.delete(API_URL + '/delete/' + id ,  { headers: authHeader() });
};

export default {
    getComment,
    getAllComment,
    getOneComment,
    creatComment,
    deleteComment
}
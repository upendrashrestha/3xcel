import axios from "axios";
import authHeader from "./auth-header";
import { baseUrl } from '../configs/config-urls';

const API_URL = baseUrl+"/api/users/";

const getAllUsers = () => {
  return axios.get(API_URL);
};

const deleteUser = async (model) => {
  return await axios.post(API_URL +'delete', {model}, { headers: authHeader() });
};

export default {
  getAllUsers,
  deleteUser
};
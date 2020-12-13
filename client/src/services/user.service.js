import axios from "axios";
import authHeader from "./auth-header";
import { baseUrl } from '../configs/config-urls';

const API_URL = baseUrl+"/api/users/";

const getAllUsers = () => {
  return axios.get(API_URL);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getAllUsers,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
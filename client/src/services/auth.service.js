import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "/users/";

const register = (name, email, password, password2) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    password2
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL+"login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data?.token && response.data.token !== undefined) {
        localStorage.setItem("jwtToken", JSON.stringify(response.data));
        const decoded = jwt_decode(response.data.token);
        // Set current user
    console.log(decoded);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("jwtToken");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("jwtToken"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
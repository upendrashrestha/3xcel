import axios from "axios";
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
        //console.log("RESPONSE",response);
        localStorage.setItem("jwtToken", JSON.stringify(response.data));
        
       }

     // return response.data;
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
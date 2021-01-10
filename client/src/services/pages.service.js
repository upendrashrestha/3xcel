import axios from 'axios';
import authHeader from './auth-header';

import { baseUrl } from '../configs/config-urls';

const API_URL = baseUrl+'/api/page/';

const getContent = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const getContentById = async (serviceId) => {
  return await axios.get(API_URL+"/"+serviceId, { headers: authHeader() });
};

const getContentByCode = async (code) => {
  return await axios.get(API_URL+"/"+code);
};

const editContent = async (model) => {
  return await axios.post(API_URL+'edit-page',{model}, { headers: authHeader() });
};

const deleteContent = async (model) => {
  return await axios.post(API_URL +'delete', {model}, { headers: authHeader() });
};


const addContent = async (model) => {
 // console.log('MODEL',model);
  return await axios.post(
    API_URL + 'add-page',
    { model },
    { headers: authHeader() }
  );
};

export default {
  getContent,
  addContent,
  getContentById,
  editContent,
  deleteContent,
  getContentByCode
};

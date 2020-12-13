import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/question/';

const getContent = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

const getContentById = async (questionId) => {
  return await axios.get(API_URL+"/"+questionId, { headers: authHeader() });
};

const editContent = async (model) => {
  return await axios.post(API_URL +'edit-question', {model}, { headers: authHeader() });
};

const deleteContent = async (model) => {
  return await axios.post(API_URL +'delete', {model}, { headers: authHeader() });
};

const addContent = async (model) => {
  return await axios.post(
    API_URL + 'add-question',
    { model },
    { headers: authHeader() }
  );
};

export default {
  getContent,
  addContent,
  getContentById,
  editContent,
  deleteContent
};

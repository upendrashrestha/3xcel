import axios from 'axios';
import authHeader from './auth-header';

import { baseUrl } from '../configs/config-urls';

const API_URL = baseUrl+'/api/score/';

const getContent = async () => {
  return  await axios.get(API_URL, { headers: authHeader() });
};



const addContent = async (model) => {
  return await axios.post(
    API_URL + 'add-score',
    { model },
    { headers: authHeader() }
  );
};

export default {
  getContent,
  addContent
};

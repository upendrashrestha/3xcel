import axios from 'axios';
import authHeader from './auth-header';
import { baseUrl } from '../configs/config-urls';

const API_URL = baseUrl+'/api/email/';


const sendEmail = async (model) => {
    return await axios.post(
        API_URL,
        { model },
        { headers: authHeader() }
      );
};

export default {
 sendEmail
};

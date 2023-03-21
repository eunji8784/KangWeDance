import axios from 'axios';
import { useCookies } from 'react-cookie';

const useApi = () => {
  const [cookies] = useCookies(['accessToken']);
  const api = axios.create({
    baseURL: 'https://kangwedance.site/dev',
    // baseURL: 'http://kangwedance.site/dev',
  });

  if (cookies.accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${cookies.accessToken}`;
  }

  return api;
};

export default useApi;
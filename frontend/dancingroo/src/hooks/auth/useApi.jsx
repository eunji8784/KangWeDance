import axios from 'axios';

const useApi = axios.create({
  baseURL: 'https://kangwedance.site/dev',
  // baseURL: 'http://kangwedance.site/dev',
});

export default useApi;

import { useState } from 'react';
import useApi from './useApi'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['access_token']);

  const history = window.history

  const handleLogin = async (Oauth, code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await useApi.get(`/parents/social/${Oauth}?code=${code}`);
      console.log(response)
      const { access_token } = response.data.accessToken;
      setCookie('access_token', access_token, { path: '/' }); //모든 경로에서 토큰 허용하겠다)
      setLoading(false);
      if (response.isUser) {
        history.replace('/play')
      } else {
        history.replace('/signup')
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { loading, error, handleLogin };
};

export default useLogin;

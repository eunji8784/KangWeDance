import { useState } from 'react';
import useApi from './useApi'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['accessToken']);
  const [isUser, setIsUser] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (Oauth, code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await useApi.get(`/parents/social/${Oauth}?code=${code}`);
      if (response.data.status!==200){
        alert(`로그인 실패, status:${response.data.status}`)
        navigate('/')
      } 
      const { accessToken, isUser } = response.data.data;
      console.log(accessToken, isUser)
      setCookie('accessToken', accessToken, { path: '/' }); //모든 경로에서 토큰 허용하겠다)
      setLoading(false);
      setIsUser(isUser)
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { loading, error, handleLogin, isUser };
};

export default useLogin;

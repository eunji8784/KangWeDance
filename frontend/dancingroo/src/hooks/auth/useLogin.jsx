import { useState } from 'react';
import useApi from './useApi'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const api = useApi()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['accessToken']);
  const [isUser, setIsUser] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (Oauth, code) => {
    try {
      const baseURL = "https://kangwedance.site/dev"
      const response = await fetch(baseURL + `/parents/social/${Oauth}?code=${code}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // [변경점] 기존의 response.data가 json이라고 생각하면 됨.
      const json = await response.json();
      if (json.status!==200){
        alert(`로그인 실패, status:${json.status}`)
        navigate('/')
      }
      const { accessToken, isUser } = json.data;
      console.log(accessToken, isUser)
      setCookie('accessToken', accessToken, { path: '/' }); //모든 경로에서 토큰 허용하겠다)
      setIsUser(isUser);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return { loading, error, handleLogin, isUser };
};

export default useLogin;

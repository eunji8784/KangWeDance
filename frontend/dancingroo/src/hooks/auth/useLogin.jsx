import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['accessToken']);

  const handleSocialLogin = async (Oauth, code) => {
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
      // console.log(json)
      setData(json)
      const { accessToken, isUser } = json.data;
      console.log(accessToken, isUser)
      setCookie('accessToken', accessToken, { path: '/' }); //모든 경로에서 토큰 허용하겠다)
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleSocialLogin };
};

export default useLogin;

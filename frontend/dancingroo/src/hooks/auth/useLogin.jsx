import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { login,logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setCookie, removeCookie] = useCookies('accessToken');

  const handleSocialLogin = async (Oauth, code) => {
    try {
      const baseURL = "https://kangwedance.site/dev"
      const response = await fetch(baseURL + `/parents/social/${Oauth}?code=${code}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
      // [변경점] 기존의 response.data가 json이라고 생각하면 됨.
      const json = await response.json();
      console.log(json)
      setData(json)
      const { accessToken, isUser } = json.data;
      console.log(accessToken, isUser)
      setCookie('accessToken', accessToken, { path: '/' }); //모든 경로에서 토큰 허용하겠다)
      dispatch(login(accessToken))
      
      // 만료된 토큰이면 로그아웃 시키도록 (만료기간:하루)
      const expiryTime = 1000*60*60*24
      setTimeout(()=>{
        removeCookie('accessToken', { path: '/' });
        dispatch(logout());
        alert('토큰이 만료되었습니다. 로그아웃됩니다.')
        navigate('/')
      }, expiryTime)

    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleSocialLogin };
};

export default useLogin;

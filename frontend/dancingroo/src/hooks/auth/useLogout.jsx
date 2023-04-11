import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookie, , removeCookie] = useCookies('accessToken');

  const handleLogout = async () => {
    removeCookie('accessToken', { path: '/' }); // Remove the accessToken cookie
    dispatch(logout());
    try {
      const baseURL = "https://kangwedance.site/dev"
      const response = await fetch(baseURL + '/parents/logout', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          accesstoken: cookie.accessToken,
        },
      })
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
      const json = await response.json();
      console.log(json)
      setData(json)
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleLogout };
};

export default useLogout;

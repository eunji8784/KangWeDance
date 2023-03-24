import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function useApi() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookie] = useCookies('accessToken');

  const baseURL = "https://kangwedance.site/dev"

  // [1]. method는 restful api의 메소드, requestBody는 api요청 시 필요한 데이터(객체)
  async function fetchApi(method, url, requestBody) {
    try {
      const response = await fetch(baseURL+url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          accesstoken: cookie.accessToken,
        },
        body: JSON.stringify(requestBody)
      });
      const json = await response.json();
      console.log(json)
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // [3]. api요청할 컴포넌트에서) 앞에 3개는 고정적으로 꺼내고, 추가로 필요한 메서드를 언팩해서 쓰면된다.
  return { data, isLoading, error, fetchApi };
}

export default useApi;
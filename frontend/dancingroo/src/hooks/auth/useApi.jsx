import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function useApi() {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookie] = useCookies('accessToken');

  const baseURL = "https://kangwedance.site/dev"

  // [1]. method는 restful api의 메소드, requestBody는 api요청 시 필요한 데이터(객체)
  async function fetchApi(method, url, requestBodyOrCallback, onSuccess) {
    // 3번째 인자 body인지 콜백인지 확인
    let requestBody;
    if (typeof requestBodyOrCallback === 'function') onSuccess = requestBodyOrCallback;
    else requestBody = requestBodyOrCallback;

    try {
      const response = await fetch(baseURL+url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          accesstoken: cookie.accessToken,
          Origin : `*`
        },
        body: JSON.stringify(requestBody)
      });
      if (method==='POST' || method==='PATCH') console.log('리퀘스트 바디(json) : ', JSON.stringify(requestBody))
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
      const json = await response.json();
      console.log(json)
      setData(json);
      if (onSuccess) onSuccess(json)
    } catch (error) {
      setError(error);
      console.error(error)
      navigate('/error')
    } finally {
      setIsLoading(false);
    }
  }

  // [2]. api요청할 컴포넌트에서) 요청이 여러개이면, data:childData 이런식으로 꺼내면 된다.
  return { data, isLoading, error, fetchApi };
}

export default useApi;
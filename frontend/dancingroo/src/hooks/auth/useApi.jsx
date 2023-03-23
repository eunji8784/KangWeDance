import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function useApi(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['accessToken']);

  const baseURL = "https://kangwedance.site/dev"

  // [1]. method는 restful api의 메소드, requestBody는 api요청 시 필요한 데이터(객체)
  async function fetchApi(method, requestBody) {
    try {
      const response = await fetch(baseURL+url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          accesstoken: cookies.accessToken,
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

  // [2]. 호출 시에 메서드는 고정값으로 들어있고 requestBody를 인자로 넣어 호출하면 된다.
  function get() {
    fetchApi('GET');
  }

  function post(requestBody) {
    fetchApi('POST', requestBody);
  }

  function del() {
    fetchApi('DELETE');
  }

  function patch(requestBody) {
    fetchApi('PATCH', requestBody);
  }
  // [3]. api요청할 컴포넌트에서) 앞에 3개는 고정적으로 꺼내고, 추가로 필요한 메서드를 언팩해서 쓰면된다.
  return { data, isLoading, error, get, post, del, patch };
}

export default useApi;

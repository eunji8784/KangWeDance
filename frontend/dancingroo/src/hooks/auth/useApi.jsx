import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function useApi(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['accessToken']);

  const baseURL = "https://kangwedance.site/dev"
  console.log(cookies.accessToken, baseURL+url)
  // [1]. method는 restful api의 메소드를 넘기고, data에는 요청 시 필요한 데이터들의 객체를 넘기면 된다. 
  async function fetchApi(method, data) {
    try {
      const response = await fetch(baseURL+url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          "accesstoken": cookies.accessToken,
        },
        body: JSON.stringify(data)
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

  // [2]. 호출 시에는 메서드는 고정된 인자로 들어있고, data만 전해주면 된다.
  function get() {
    fetchApi('GET');
  }

  function post(data) {
    fetchApi('POST', data);
  }

  function del() {
    fetchApi('DELETE');
  }

  function patch(data) {
    fetchApi('PATCH', data);
  }
  // [3]. 앞에 3개는 고정적으로 꺼내고, 추가로 필요한 메서드를 언팩해서 쓰면된다.
  return { data, isLoading, error, get, post, del, patch };
}

export default useApi;

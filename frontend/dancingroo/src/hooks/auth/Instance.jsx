import axios from "axios";

// axios.create는 나만의 엑시오스 인스턴스를 만드는 메서드이다.
const instance = axios.create({
  baseURL: "https://kangwedance.site/dev"
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
instance.interceptors.request.use(
  (config) => {
    try {
      return config;
    } catch (err) {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
 instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
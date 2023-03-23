import React, { useEffect } from "react";
import useLogin from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/ui/Semantics";

function OauthKakao(props) {
  const navigate = useNavigate();
  const { data, loading, error, handleSocialLogin } = useLogin();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    handleSocialLogin("kakao", code);
  }, []);
 
  useEffect(() => {
    //useLogin이 성공했을 때 : data에 response.data, erorr:null 반환
    // 실패했을 때, data:null, erorr에 에러 메시지 반환
    if (error) {
      console.error(error);
      navigate("/error");
      return;
    }
    if (data) {
      // console.log(data);
      data.data.isUser === "true" ? navigate("/play") : navigate("/signup");
    }

  }, [loading, data, error, navigate]);
  
  return (
    <Wrapper>
      카카오 로그인 중입니다...
    </Wrapper>
  );
}

export default OauthKakao;

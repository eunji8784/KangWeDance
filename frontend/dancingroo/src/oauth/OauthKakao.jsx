import React, { useEffect } from "react";
import useLogin from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/ui/Semantics";

function OauthKakao(props) {
  const navigate = useNavigate();
  const { error, isUser, handleLogin } = useLogin();
  const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    handleLogin("kakao", code);
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/error");
    } else if (isUser === "true") {
      navigate("/play");
    } else if (isUser === "false") {
      navigate("/signup");
    }
  }, [error, isUser, navigate]);

  return (
    <Wrapper>
      {/* Add your content here */}
    </Wrapper>
  );
}

export default OauthKakao;

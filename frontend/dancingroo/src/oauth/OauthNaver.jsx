import React, { useEffect } from "react";
import useLogin from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../components/common/ui/Semantics";
import { useDispatch } from "react-redux";

function OauthNaver(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { data, loading, error, handleSocialLogin } = useLogin();
    let code = new URL(window.location.href).searchParams.get("code");
    let state = new URL(window.location.href).searchParams.get("state");
    const STATE_TOKEN = process.env.REACT_APP_STATE_TOKEN
    console.log(STATE_TOKEN)
    console.log(code, state)

    useEffect(()=>{
        if (state!==STATE_TOKEN){
            throw new Error("401 UNAUTHORIZED") 
        } else {
            handleSocialLogin("naver", code)
        }    
    },[state, code])
    useEffect(()=>{
        if (data){
            data.data.isUser === "true" ? navigate("/play") : navigate("/users/join");
        }
    },[data])
    return (
        <Wrapper>
            네이버 로그인 중입니다...
        </Wrapper>
    );
}

export default OauthNaver;

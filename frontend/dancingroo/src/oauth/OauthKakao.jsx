import React,{useEffect, useState} from "react";
// import { useCookies } from 'react-cookie';
import useLogin from "../hooks/auth/useLogin";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

function OauthKakao(props) {
    const navigate = useNavigate();
    const { loading, error, handleLogin } = useLogin();
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    let code = new URL(window.location.href).searchParams.get('code')
    useEffect(()=>{
        handleLogin('kakao', code)

    },[])
    return (
        <Wrapper>
            카카오로그인
        </Wrapper>
    );
}

export default OauthKakao;

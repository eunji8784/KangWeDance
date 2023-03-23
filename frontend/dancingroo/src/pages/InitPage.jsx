import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// 로고
import bigLogo from "../assets/images/bigLogo.png"
import bgImg from "../assets/images/bgImg.png"
import naver_login from "../assets/images/naver_login.png"
import kakao_login from "../assets/images/kakao_login.png"

import { useSelector } from "react-redux";
import useApi from "../hooks/auth/useApi";
import { logout } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display:flex;
    flex-direction:column;
    position:relative;
    align-items:center;
    justify-content:center;
    & > img:first-child {
    position: absolute;
    width:60%;
    min-width:35rem;
    top: 12rem;
    z-index: 2;
    }
    & > img:last-child {
      position: absolute;
      bottom:0;
      z-index: 0;
      width:100%;
      height:100%;
    }
    .socialLogin{
      display:flex;
      flex-direction:column;
      position: absolute;
      /* background-color:blue; */
      z-index:1;
      width:20rem;
      top: 25rem;
      left: auto; right:auto;
      font-size:30px;
      text-align:center;
    }
    .login-btn{
    width:15rem;
    height:3.5rem;
    margin: 0.3rem 0;
    border-radius:10px;
    cursor: pointer;
    box-shadow: 0px 3px 10px rgba(240, 84, 117, 0.3);
    transition: box-shadow 0.3s ease-in-out;
    &:hover{
        box-shadow: 0px 3px 15px rgba(240, 84, 117, 0.6);
    }
    }
`;

function InitPage(props) {
    const navigate = useNavigate();
    const {data, isLoading, error, get} =useApi('/parents/logout')
    const dispatch = useDispatch()
    const [, ,removeCookie] = useCookies();
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    const KAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI}&response_type=code`
    let isLoggedOut = new URL(window.location.href).searchParams.get("state");

    useEffect(()=>{
      // 로그아웃해서 홈으로 리다이렉트 && 로그아웃요청 아직 보내지 않은 상태이면,
      if (isLoggedOut==='logout' && !data){
        get()
      }
    },[isLoggedOut])

    useEffect(()=>{
      if (error) {
        console.error(error)
        navigate('/error')
      }
      if (data){
        dispatch(logout())
        removeCookie("accessToken")
      }
    },[data, error])

    return (
        <Wrapper>
          <img src={bigLogo} alt=""/>
          <div className="socialLogin">
            <a href={KAUTH_KAKAO}>
              <img src={kakao_login} alt="" className='login-btn'/>
            </a>
            <a href={''}>
              <img src={naver_login} alt="" className='login-btn'/>
            </a>
          </div>
          <img src={bgImg} alt="" />
        </Wrapper>
    );
}

export default InitPage;

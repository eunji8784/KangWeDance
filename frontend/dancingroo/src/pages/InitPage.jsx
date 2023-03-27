import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// 로고
import bigLogo from "../assets/images/bigLogo.png"
import bgImg from "../assets/images/bgImg.png"
import naver_login from "../assets/images/naver_login.png"
import kakao_login from "../assets/images/kakao_login.png"

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
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    // 로컬 테스트 용
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    // 배포 서버 용
    const REDIRECT_URI_SITE = process.env.REACT_APP_REDIRECT_URI_SITE
    const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI+'kakao'}&response_type=code`
    // 네이버
    const API_KEY_NAVER = process.env.REACT_APP_API_KEY_NAVER
    const STATE_TOKEN = process.env.REACT_APP_STATE_TOKEN 
    const OAUTH_NAVER = `https://nid.naver.com/oauth2.0/authorize?client_id=${API_KEY_NAVER}&response_type=code&redirect_uri=${REDIRECT_URI+'naver'}&state=${STATE_TOKEN}`
    console.log(REDIRECT_URI+'kakao')
    return (
        <Wrapper>
          <img src={bigLogo} alt=""/>
          <div className="socialLogin">
            <a href={OAUTH_KAKAO}>
              <img src={kakao_login} alt="" className='login-btn'/>
            </a>
            <a href={OAUTH_NAVER}>
              <img src={naver_login} alt="" className='login-btn'/>
            </a>
          </div>
          <img src={bgImg} alt="" />
        </Wrapper>
    );
}

export default InitPage;

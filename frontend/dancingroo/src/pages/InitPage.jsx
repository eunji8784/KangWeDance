import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bigLogo from "../assets/images/bigLogo.png"
import musicNote from "../assets/images/musicNote.png"
import kangkang from "../assets/images/kangkang.png"

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
    width:50%;
    top: 5rem;
    z-index: 2;
  }
  &> img:nth-child(2){
    position: absolute;
    top:40rem;
    width:60rem;
    height:60rem;;
    z-index: 3;
  }
  & > img:last-child {
    position: absolute;
    bottom:0;
    z-index: 0;
    width:70%;
    height:70%;
  }
  .socialLogin{
    display:block;
    position: absolute;
    /* background-color:blue; */
    z-index:1;
    width:60rem;
    height:22rem;
    bottom: 45rem;
    font-size:100px;
    text-align:center;
  }
`;

function PlayPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
          <img src={bigLogo} alt="" />
          <img src={kangkang} alt="" />
          <div className="socialLogin">
            <div>카카오로그인</div>
            <div>네이버로그인</div>
          </div>
          <img src={musicNote} alt="" />
        </Wrapper>
    );
}

export default PlayPage;

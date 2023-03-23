import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogout from "../../../hooks/auth/useLogout";
import { useSelector } from "react-redux";
//logo
import logo from "../../../assets/images/logo.png"
import {RiUserFill} from "react-icons/ri";
import Dance from '../../../assets/images/Dance.png'
import Gallery from '../../../assets/images/Gallery.png'
import Status from '../../../assets/images/Status.png'

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    min-height:10rem;
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Menu = styled.img`
    /* border: 1px solid black; */
    width:4rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
`;
const Logo = styled.div`
    /* background-color:gold; */
    width: 12rem;
    height: 3rem;
    background-image:url(${logo});
    background-size:cover;
    cursor: pointer;
`
const BarContainer = styled.div`
    /* border: 1px solid black; */
    width:${props=>props.width}%;
    height: ${props=>props.height}%;
    display:flex;
    align-items:center;
    justify-content:${props=>props.justify};
    /* border:1px solid red; */
    .user-menu{
        /* border:1px solid blue; */
        display:flex;
        justify-content:space-between;
        width:6rem;
        align-items:center;
        /* margin-top:0.5rem; */
        &>div{
            cursor: pointer;
        }
    }
`
const LogoContainer = styled.div`
    /* border: 1px solid red; */
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    width:13rem;
    height:5.8rem;
    font-size: 0.95rem;
    padding:0;
    &>span{
        font-weight:${props=>props.active? "bold":"normal"};
    }
    // img에 hover했을때,
    &>img:hover{
        transform: scale(1.1);
        // img와 형제요소인 span선택자.
        &~span{
            /* font-weight:bold;  */
        }
    }
`
const Highlight = styled.div`
    position: absolute;
    bottom: 0;
    width: 2.5rem;
    height: 7%;
    background-color: orange;
    border-radius:10px;
    opacity: ${({ active }) => active ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
`;
const LogOut = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 1.3rem;
    font-size: 0.7rem;
    background-color: #ffd8e0;
    border-radius: 21px;
    text-align: center;
    font-weight: bold;
    color: white;
    border: 2px solid #ffd8e0;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #ff9aa2;
        border-color: #ff9aa2;
        cursor: pointer;
        font-weight: bolder;
        font-size: 0.8rem;
        width: 3.7rem;
        height: 1.5rem;
  }
`

function HeaderBar(props) {
    const {watchingPage} = props;
    const isLoggedIn = useSelector(state=>state.userState.isLoggedIn);
    const familyname = useSelector(state=>state.userState.familyname)
    const {isLoading, error, handleLogout} = useLogout()
    const [activeMenu, setActiveMenu] = useState(watchingPage);
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI
    const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        setActiveMenu(watchingPage)
    },[watchingPage])

    const handleClick = ()=>{
        // 로그아웃처리하고, 카카오 로그아웃 후 홈으로 리다이렉트
        handleLogout()
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API_KEY_KAKAO}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}&state=logout`
    const handleClick = ()=>{
        // 로그아웃처리하고, 카카오 로그아웃 후 홈으로 리다이렉트
        handleLogout()
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API_KEY_KAKAO}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}&state=logout`
    }
    return (
        <Wrapper>
            <BarContainer height={30} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    navigate("/play");
                    setActiveMenu("play");
                }}
                    />
                <div className="username">
                    {isLoggedIn &&
                        `${familyname || '캥거루합창단'} 환영합니다!`
                    }
                </div>
                <div className="user-menu">
                    <LogOut onClick={() => {
                            handleClick()
                            handleClick()
                        }}>로그아웃</LogOut>
                    <div
                        onClick={() => {
                            navigate(`/users`);
                        }}>   
                        <RiUserFill color="#F05475" size="2rem"/>
                    </div>
                </div>
            </BarContainer>
            <BarContainer height={70} justify={"center"} width={80}>
                <LogoContainer
                    active={activeMenu === "play"}
                >
                    <Menu src={Dance} 
                    onClick={() => {
                        navigate("/play");
                        setActiveMenu('play')
                    }}/>
                    <span>둠칫둠칫</span>
                    <Highlight active={activeMenu === "play"}/>
                </LogoContainer>
                <LogoContainer
                    active={activeMenu === "status"}
                >
                    <Menu src={Status}                    
                    onClick={() => {
                        navigate("/status");
                        setActiveMenu('status')
                    }}/>  
                    <span>건강일지</span>
                    <Highlight active={activeMenu === "status"}/>
                </LogoContainer>
                <LogoContainer
                    active={activeMenu === "photos"}
                >
                    <Menu src={Gallery}                    
                    onClick={() => {
                        navigate("/photos");
                        setActiveMenu('photos')
                    }}/>
                    <span>사진첩</span>
                    <Highlight active={activeMenu === "photos"}/>
                </LogoContainer>
            </BarContainer>
            <div className="bottom-line" />
        </Wrapper>
    );
}

export default HeaderBar;

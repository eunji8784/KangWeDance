import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogout from "../../../hooks/auth/useLogout";
import { useSelector, useDispatch } from "react-redux";
import { childSelect } from "../../../store/userSlice";
//logo
import logo from "../../../assets/images/logo.png"
import {RiUser3Fill} from "react-icons/ri";
import Dance from '../../../assets/images/Dance.png'
import Gallery from '../../../assets/images/Gallery.png'
import Status from '../../../assets/images/Status.png'
import  { Line } from "../ui/Semantics";

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    min-height:${props=>props.onlyTopBar ? 3 : 10}rem;
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Menu = styled.img`
    width:4rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
`;

const Logo = styled.div`
    width: 12rem;
    height: 2.4rem;
    background-image:url(${logo});
    background-size:cover;
    cursor: pointer;
`

const BarContainer = styled.div`
    width:${props=>props.width}%;
    height: ${props=>props.height}%;
    display:flex;
    align-items:center;
    justify-content:${props=>props.justify};
    .user-menu{
        display:flex;
        justify-content:space-between;
        width:6rem;
        align-items:center;
        &>div{
            cursor: pointer;
        }
    }
    .user-icon{
        display:flex;
        align-items:center;
        cursor: pointer;
    }
    .username{
        position:absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`

const LogoContainer = styled.div`
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

function HeaderBar({watchingPage, onlyTopBar}) {
    /* eslint-disable */
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state=>state.userState.isLoggedIn);
    const familyname = useSelector(state=>state.userState.familyname)
    const {data, isLoading, error, handleLogout} = useLogout()
    const [activeMenu, setActiveMenu] = useState(watchingPage);
    const API_KEY_KAKAO = process.env.REACT_APP_API_KEY_KAKAO;
    const LOGOUT_REDIRECT_URI_SITE = process.env.REACT_APP_LOGOUT_REDIRECT_URI_SITE
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        setActiveMenu(watchingPage)
    },[watchingPage])

    useEffect(()=>{
        if (data){
            const social = data.data
            if (social==="Naver"){
                window.location.href = 'https://kangwedance.site'
            } 
            else if (social==="Kakao"){
                window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${API_KEY_KAKAO}&logout_redirect_uri=${LOGOUT_REDIRECT_URI_SITE}&state=logout`
            } 
        }
    },[data])
    const logoutHandler = ()=>{
        if (window.confirm('로그아웃 하시겠습니까?')){
            handleLogout()
        }
    }
    
    return (
        <Wrapper onlyTopBar={onlyTopBar}>
            <BarContainer height={onlyTopBar ? 100 : 30} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    dispatch(childSelect(0))
                    navigate("/play");
                    setActiveMenu("play");
                }}
                    />
                <div className="username">
                    {isLoggedIn &&
                        `${familyname || '캥거루합창단'} 님 환영합니다!`
                    }
                </div>
                <div className="user-menu">
                    {isLoggedIn &&
                    <>
                    <LogOut onClick={logoutHandler}>로그아웃</LogOut>
                                        <div className="user-icon"
                    onClick={() => {
                        navigate(`/users`);
                    }}>   
                        <RiUser3Fill color="#F05475" size="1.9rem"/>
                    </div>
                    </>
                    }
                </div>
            </BarContainer>
            <Line/>
            {!onlyTopBar &&
            <>
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
            </>

            }
        </Wrapper>
    );
}

export default HeaderBar;

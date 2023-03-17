import React, {useState
    // , useRef
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    font-size:0.8rem;
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
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('play');

    return (
        <Wrapper>
            <BarContainer height={30} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    navigate("/play");
                    setActiveMenu("play");
                }}
                    />
                <div className="user-menu">
                    <LogOut onClick={() => {
                            navigate(`/`);
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
                    onClick={() => {
                        navigate("/play");
                        setActiveMenu('play')
                    }}
                    active={activeMenu === "play"}
                >
                    <Menu src={Dance}/>
                    <span>둠칫둠칫</span>
                    <Highlight active={activeMenu === "play"}/>
                </LogoContainer>
                <LogoContainer
                    onClick={() => {
                        navigate("/status");
                        setActiveMenu('status')
                    }}
                    active={activeMenu === "status"}
                >
                    <Menu src={Status}/>  
                    <span>건강일지</span>
                    <Highlight active={activeMenu === "status"}/>
                </LogoContainer>
                <LogoContainer
                    onClick={() => {
                        navigate("/photos");
                        setActiveMenu('photos')
                    }}
                    active={activeMenu === "photos"}
                >
                    <Menu src={Gallery}/>
                    <span>사진첩</span>
                    <Highlight active={activeMenu === "photos"}/>
                </LogoContainer>
            </BarContainer>
            <div className="bottom-line" />
        </Wrapper>
    );
}

export default HeaderBar;

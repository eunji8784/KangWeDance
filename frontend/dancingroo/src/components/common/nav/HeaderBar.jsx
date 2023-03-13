import React, {useState, useRef} from "react";
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
    height:8rem;
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  &>*{
    transition: opacity 0.3s ease-in-out;
  }
`;
const Menu = styled.img`
    /* border: 1px solid black; */
    width:30%;
    cursor: pointer;
`;
const Logo = styled.div`
    width: 9rem;
    height: 2rem;
    background-image:url(${logo});
    background-size:cover;
    cursor: pointer;
`
const BarContainer = styled.div`
    /* border: 1px solid black; */
    width:${props=>props.width}%;
    height: ${props=>props.height}%;
    display:${props=>props.display? 'flex':'none'};
    align-items:center;
    justify-content:${props=>props.justify};
    /* border:1px solid red; */
    .user-menu{
        /* border:1px solid blue; */
        display:flex;
        justify-content:space-between;
        width:5rem;
        align-items:center;
        margin-top:0.5rem;
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
    width:10rem;
    height:4.5rem;
    font-size:0.7rem;
    padding:0;
    &>span{
        font-weight:${props=>props.active? "bold":"normal"};
        :hover{
            font-weight:bold; 
        }
    }
    // img에 hover했을때,
    &>img:hover{
        transform: scale(1.1);
        // img와 형제요소인 span선택자.
        &~span{
            font-weight:bold; 
        }
    }
`
const Highlight = styled.div`
  position: absolute;
  bottom: 0;
  width: 20%;
  height: 10%;
  background-color: orange;
  border-radius:10px;
  opacity: ${({ active }) => active ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;
const LogOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1rem;
  font-size: 0.1rem;
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
    font-size: 0.2rem;
    width: 3.3rem;
    height: 1.1rem;
  }
`

function HeaderBar(props) {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('dances');

    return (
        <Wrapper>
            <BarContainer height={30} justify={"space-between"} width={100} display={true}>
                <Logo onClick={() => {
                    navigate("/");
                    setActiveMenu("dances");
                }}
                    />
                <div className="user-menu">
                    <LogOut>로그아웃</LogOut>
                    <div
                        onClick={() => {
                            navigate(`/users`);
                        }}>   
                        <RiUserFill color="#F05475" size="1.5rem"/>
                    </div>
                </div>
            </BarContainer>
            <BarContainer height={70} justify={"center"} width={80} display={props.display}>
                <LogoContainer
                    onClick={() => {
                        navigate("/");
                        setActiveMenu('dances')
                    }}
                    active={activeMenu === "dances"}
                >
                    <Menu src={Dance}/>
                    <span>둠칫둠칫</span>
                    <Highlight active={activeMenu === "dances"}/>
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

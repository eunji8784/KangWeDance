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
    /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); */
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Line = styled.div`
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`

const Menu = styled.img`
    /* border: 1px solid black; */
    width:30%;
`;

const Logo = styled.div`
    width: 9rem;
    height: 2rem;
    background-image:url(${logo});
    background-size:cover;
`

const BarContainer = styled.div`
    /* border: 1px solid black; */
    width:${props=>props.width}%;
    height: ${props=>props.height}%;
    display:flex;
    align-items:center;
    justify-content:${props=>props.justify};
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

function HeaderBar(props) {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <Wrapper>
            <BarContainer height={30} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    navigate("/");
                    setActiveMenu("dances");
                }}
                    />
                <div
                    onClick={() => {
                        navigate(`/users`);
                    }}>   
                    <RiUserFill color="#F05475" size="1.5rem"/>
                </div>
            </BarContainer>
            <BarContainer height={70} justify={"center"} width={80}>
                <LogoContainer
                    onClick={() => {
                        navigate("/");
                        setActiveMenu('dances')
                    }}
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

import React from "react";
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
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

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
    justify-content:${props=>props.justify};;
`
const LogoContainer = styled.div`
    /* border: 1px solid red; */
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:10rem;
    font-size:0.8rem;
`

function HeaderBar(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <BarContainer height={30} justify={"space-between"} width={100}>
            <Logo onClick={() => {navigate("/");}}/>
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
                            navigate("/dances");
                        }}
                    >
                        <Menu src={Dance}/>
                        <span>둠칫둠칫</span>
                    </LogoContainer>
                    <LogoContainer
                        onClick={() => {
                            navigate("/status");
                        }}
                    >
                        <Menu src={Status}/>  
                        <span>건강일지</span>
                    </LogoContainer>
                    <LogoContainer
                        onClick={() => {
                            navigate("/photos");
                        }}
                    >
                        <Menu src={Gallery}/>
                        <span>사진첩</span>
                    </LogoContainer>
            </BarContainer>
        </Wrapper>
    );
}

export default HeaderBar;

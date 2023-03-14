import React, {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//logo
import logo from "../../../assets/images/logo.png"
import {RiUserFill} from "react-icons/ri";

const Wrapper = styled.div`
    /* background-color:gray; */
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;
    height:3rem;
    .bottom-line {
    width: 100vw;
    height: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
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

    return (
        <Wrapper>
            <BarContainer height={100} justify={"space-between"} width={100}>
                <Logo onClick={() => {
                    navigate("/play");
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
            {/* <div className="bottom-line" /> */}
        </Wrapper>
    );
}

export default HeaderBar;

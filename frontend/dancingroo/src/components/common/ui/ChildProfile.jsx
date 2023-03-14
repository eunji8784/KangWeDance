import React, {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//logo
import logo from "../../../assets/images/logo.png"
import {RiUserFill} from "react-icons/ri";
import kangkang from "../../../assets/images/kangkang.png"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height:5rem;
`
const ProfileImg = styled.img`
    margin:0 0.3rem;
    background-color:#FFD732;
    width:3.5rem;
    height:3.5rem;
    border-radius:100%;
    border: 4px solid transparent;
    outline: none;
    box-sizing: border-box;
    :hover{
      ${({ active }) =>
      active=="false" &&
      ` 
      transform: scale(1.2);
      transition: transform 0.3s ease-in-out;
      border-color: #F05475;
      cursor: pointer;
      `
      }
    }
    ${({ active }) =>
      active==="true" &&
       `
        transform: scale(1.2);
        border-color: #F05475;
      `}
`

function ChildProfile(props) {
    const navigate = useNavigate();
    const [profileImg, setProfileImg] = useState(kangkang)
    const [active, setActive] = useState([true, false, false]); 

    const handleClick = (childIdx) => {
      setActive((prevActive)=>
      prevActive.map((active, idx)=>idx===childIdx? true : false)
      );
    };

    return (
        <Wrapper>
          {/* bool값은 html에서 유효하지 않기 떄문에 string으로 바꿔서 보내줌 */}
          <ProfileImg active={active[0].toString()} onClick={()=>handleClick(0)}/>
          <ProfileImg active={active[1].toString()} onClick={()=>handleClick(1)}/>
          <ProfileImg active={active[2].toString()} onClick={()=>handleClick(2)}/>
        </Wrapper>
    );
}

export default ChildProfile;

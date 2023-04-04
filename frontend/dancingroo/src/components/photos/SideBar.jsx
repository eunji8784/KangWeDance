import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";
import {MdOutlineInsertPhoto}  from 'react-icons/md';
import {IoShapesOutline} from 'react-icons/io5';
import {RxFrame} from 'react-icons/rx';

const SideBarSection = styled(Wrapper)`
  width: 5%;
  min-width: 3rem;
  height: 100%;
  justify-content: start;
  border-left:solid #ffeef2;
`

const StyledDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    font-size: 0.8rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    cursor: pointer;
    :hover{
      background-color:#f3c7d0;
    }
    ${({active}) => `
      & > ${Highlight} {
        opacity: ${active ? 1 : 0};
      }
      color:${active ? "#F05475" : '#black'};
      background-color:${active ? "#ffeef2" : '#ffffff'};
    `}
`

const Highlight = styled.div`

`;

function SideBar({handleSection}) {
    const [activeState, setActiveState] = useState('gallery'); 

    const handleClick = (mode)=>{
      setActiveState(mode)
      handleSection(mode)
    }
    
    return (
        <SideBarSection >
          <StyledDiv active={activeState === 'gallery'} onClick={()=>handleClick('gallery')}>
            <MdOutlineInsertPhoto size="35"/> 갤러리
          </StyledDiv>
          <StyledDiv active={activeState === 'frame'} onClick={()=>handleClick('frame')}>
            <RxFrame size="30"/> 프레임
          </StyledDiv>
          <StyledDiv active={activeState === 'sticker'} onClick={()=>handleClick('sticker')}>
            <IoShapesOutline size="28"/> 스티커
          </StyledDiv>
        </SideBarSection>
    );
}

export default SideBar;
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #D9D9D9;
    height:3.5rem;
    width:100%;
`;
const StyledDiv = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    width:50%;
    height:100%;
    cursor: pointer;
    :hover{
      /* color:#F05475; */
    }
    ${({active}) => `
      & > ${Highlight} {
        opacity: ${active ? 1 : 0};
      }
      color:${active ? "#F05475" : 'black'};
      font-weight:${active ? "bold" : 'normal'};
    `}
`

const Highlight = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 7%;
  background-color: #F05475;
  border-radius:10px;
  opacity: 0;
  transition: opacity 0.3 s ease-in-out;
`;

function StatusBar(props) {
    const {handleSection} = props;
    const [activeState, setActiveState] = useState('health')

    const handleClick = (mode)=>{
      setActiveState(mode)
      handleSection(mode)
    }
    
    return (
        <Wrapper >
          <StyledDiv active={activeState === 'health'} onClick={()=>handleClick('health')}>건강 기록
            <Highlight/>
          </StyledDiv>
          <StyledDiv active={activeState === 'play'} onClick={()=>handleClick('play')}>운동 기록
            <Highlight/>
          </StyledDiv>            
        </Wrapper>
    );
}

export default StatusBar;

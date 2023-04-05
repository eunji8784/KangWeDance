import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import styled from "styled-components";
import kangkang from "../../assets/images/kangkang.png"

const ProgressBarWrapper = styled.div`
  position: absolute;
  height: 1.3rem;
  width: 40%;
  border-radius: 1rem;
  background-color: #FFFFFF;
  top: 5%;
  left: 30%;
  border: 1px solid #c9f7f9;
  flex-direction: column;
  justify-content: flex-end;
`;


const ProgressGauge = styled.div`
  bottom: 0;
  left: 0;
  height: 100%;
  border-radius: 1rem;
  background-color: #F05475;
  transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  position:absolute;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  div:last-child{
    width:8rem;
    position:absolute;
    right:-9rem;
  }
`;

const ProgressImg = styled.img`
  width:2.5rem;
  height:2.5rem;
  position:absolute;
  right:0;
  animation: walk 1s linear infinite alternate;
  
  @keyframes walk {
    0% {
      transform: translateX(0) rotate(0deg);
    }
    50% {
      transform: translateX(15px) rotate(10deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }
`

function ProgressBar({nowProgress, endProgress}) {
  /* eslint-disable */
  const [progressPercent, setProgressPercent] = useState(0.1);

  const message = ()=>{
    switch (true) {
      case progressPercent < 15:
        return <span>시작!</span> 
      case progressPercent < 40:
        return <span>신나게!</span> 
      case progressPercent < 75:
        return <span>춤춰요!</span>
      case progressPercent <= 96:
        return <span>거의 다 왔어요!</span> 
      case progressPercent > 96:
        return <span>Finish!</span>
    }
  }

  const calculateProgress = useCallback(() => {
    setProgressPercent((nowProgress / endProgress).toFixed(2) * 100);
  }, [nowProgress, endProgress]);

  useEffect(() => {
    calculateProgress()
  }, [nowProgress, endProgress]);
  
  return (
    <ProgressBarWrapper>
      <ProgressGauge style={{ width:  `${progressPercent}%`}}>
        <ProgressImg src={kangkang}/>
        <div>
          {message()}
        </div>
      </ProgressGauge>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

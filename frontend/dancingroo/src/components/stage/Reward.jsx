import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { Overlay } from '../common/ui/Semantics';
import { MdLock, MdLockOpen } from 'react-icons/md';

const FrameWrapper = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 0;
  flex-direction: column;
  .next {
    font-size: 1.5rem;
    font-weight: 600;
  }
`
const FrameItem = styled.div`
  height: 7.2rem;
  width: 12.8rem;
  background-image:url(${(props)=>props.imageUrl});
  background-size:cover;
  filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
  border-radius: 0.2rem;
  margin:1.5rem 1rem;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const GrayOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.2);
`

const shakeAnimation = keyframes`
  0% {
    transform: rotateZ(0);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  50% {
    transform: rotateZ(10deg);
  }
  75% {
    transform: rotateZ(-10deg);
  }
  100% {
    transform: rotateZ(10deg);
  }
`;

const fallAnimation = keyframes`
  0% {
    transform: rotateZ(10deg);
  }
  15% {
    transform: scale(1.25) rotateZ(10deg);
  }
  30% {
    transform: scale(1) rotateZ(10deg);
  }
  50% {
    opacity: 1;
    transform: rotateZ(10deg);
  }
  100% {
    transform: rotateZ(10deg) translateY(100%);
    opacity: 0;
  }
`;

const LockIcon = styled(MdLock)`
  font-size: 3rem;
  color: black;
  transition: all 1s;
  animation: ${props => (props.levelUp ? shakeAnimation : null)} 0.5s ease-in-out forwards;
  animation-delay: 2.5s;
`;

const UnLockIcon = styled(MdLockOpen)`
  font-size: 3rem;
  color: black;
  transition: all 0.2s;
  animation: ${fallAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`

function Reward({levelUp, frame}) {
  
  const [unlocked, setUnlocked] = useState(false);
  const nextFrame = frame?.filter((e)=>e.unLock===false)[0]

  useEffect(() => {
    if (levelUp) {
      setTimeout(() => {
        setUnlocked(true);
      }, 3500);
    }
  }, [levelUp]);

  return (
    <FrameWrapper>
      <div className='next'>다음 보상</div>
      <FrameItem imageUrl={nextFrame?.frameURL}>
        {!unlocked ?
        <GrayOverlay>
          <LockIcon levelUp={levelUp}/>
        </GrayOverlay>
        :
        <UnLockIcon/>}
      </FrameItem>
    </FrameWrapper>
  );  
}

export default Reward;

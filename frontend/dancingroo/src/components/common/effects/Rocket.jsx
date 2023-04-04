import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import 캥거루 from '../../../assets/images/캥거루열기구.png';
import 캥거루발사 from '../../../assets/images/캥거루열기구_상승시.png';

const Rocket = () => {
  const [showButton, setShowButton] = useState(false);
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    setIsAscending(true);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
    setTimeout(() => {
      setIsAscending(false);
    }, 1500); // 3초 뒤 원복
  };

  return (
    <>
      {showButton && (
        <ButtonWrapper onClick={handleClick}>
          <KangRocket src={isAscending ? 캥거루발사 : 캥거루} alt="rocket" 
          onMouseEnter={()=>setIsAscending(true)} onMouseLeave={()=>setIsAscending(false)}
          />
        </ButtonWrapper>
      )}
    </>
  );
};

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
`;

const ascendAnimation = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(0, -50%);
  }
  50% {
    transform: translate(0, -70%);
  }
  75% {
    transform: translate(0, -90%);
  }
  100% {
    transform: translate(0, -100%);
  }
`;

const KangRocket = styled.img`
  width: 7rem;
  height: 7rem;
  z-index: 5 !important;
  box-sizing:border-box;
  animation: ${({ isAscending }) => (isAscending ? ascendAnimation : '')} 1.5s linear,
            up-animation 1s ease-in-out forwards;
            
  @keyframes up-animation {
    0% {
      opacity: 0.5;
      transform: translateY(40%);
    }
    30% {
      opacity: 1;
      transform: translateY(0%)
    }
    100% {
      opacity: 1;
    }
`;

export default Rocket;

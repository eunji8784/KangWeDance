import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Rocket = () => {
  const [showButton, setShowButton] = useState(false);

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <ButtonWrapper onClick={handleClick}>
          <ArrowIcon />
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

const ArrowIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(-135deg);
  display: inline-block;
  padding: 3px;
`;

export default Rocket;

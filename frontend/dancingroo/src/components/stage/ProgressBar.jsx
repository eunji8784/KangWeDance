import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

const ProgressBarWrapper = styled.div`
  position: absolute;
  height: 75%;
  width: 1rem;
  border-radius: 1rem;
  background-color: #FFFFFF;
  top: 12.5%;
  left: 5rem;
  border: 1px solid black;
`;

const ProgressGauge = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #F05475;
  transition: width 2.5s cubic-bezier(0.65, 0, 0.35, 1);
`;

function ProgressBar({nowProgress, endProgress}) {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      setProgressPercent(nowProgress / endProgress * 100);
    };

    const intervalId = setInterval(() => {
      calculateProgress();
    }, 500);

    return () => clearInterval(intervalId);
  }, [nowProgress]);

  return (
    <ProgressBarWrapper>
      <ProgressGauge style={{ height: `${progressPercent}%`}} />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

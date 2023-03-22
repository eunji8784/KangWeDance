import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

const levelUpAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  50% { opacity: 1; }
  70% { opacity: 1; transform: translateY(-20px); }
  100% { opacity: 0; transform: translateY(-40px); }
`;

const levelPluseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3);}
  70% { transform: scale(1.15);}
  100% { transform: scale(1);}
`;

const ExpGaugeWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 3rem;
  border-radius: 8px;
  background-color: #ddd;
  margin-top: 3rem; // 바꾸자
`;

const ExpBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 8px;
  background-color: #F05475;
  transition: width 2.5s cubic-bezier(0.65, 0, 0.35, 1);
`;

const LevelUpExpBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 8px;
  background-color: #F05475;
  transition: width 1.5s cubic-bezier(0.65, 0, 0.35, 1);
`

const ExpText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

const LevelUpAnimation = styled.div`
  position: absolute;
  top: -3rem;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: bold;
  color: #F05475;
  animation: ${levelUpAnimation} 2s ease-out;
  opacity: 0;
`;

const UserLevel = styled.div`
  position: absolute;
  top: -3rem;
  right: 0;
  font-size: 2rem;
  font-weight: bold;
`
const AnimatedUserLevel = styled(UserLevel)`
  animation: ${levelPluseAnimation} 0.5s ease-out;
  scale: 1.15;
`;

function UserEXP({userLevel,startEXP, endEXP, totalLevelEXP, nextLevelEXP}) {
  const [expPercent, setExpPercent] = useState(startEXP ? startEXP / totalLevelEXP * 100 : 0);
  const [nextExpPercent, setNextExpPercent] = useState(0)
  const [level, setLevel] = useState(userLevel)
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentExp, setCurrentExp] = useState(startEXP);

  useEffect(() => {
    const percent = (endEXP / totalLevelEXP) * 100;
    setExpPercent(percent > 100 ? 100 : percent);

    if (totalLevelEXP <= endEXP) {
      setTimeout(() => {
        setShowLevelUp(true);
        setLevel((prev)=>prev+1)
      }, 2500);
    }
  }, [endEXP, totalLevelEXP]);

  useEffect(() => {
    if (!showLevelUp) return;
    setTimeout(() => {
      const nextPercent = (endEXP - totalLevelEXP) / nextLevelEXP * 100
      setNextExpPercent(nextPercent);
    }, 500);
    // const nextPercent = (endEXP - totalLevelEXP) / nextLevelEXP * 100
    // console.log("!!!")
    // setNextExpPercent(nextPercent);
  },[showLevelUp, endEXP, totalLevelEXP, nextLevelEXP])

  useEffect(() => {
    let intervalId;
    const aimedExp = showLevelUp ? (endEXP - totalLevelEXP) : Math.min(endEXP, totalLevelEXP)
    const difference = aimedExp - (showLevelUp ? 0 : currentExp)
    const increment = parseInt(difference / 100);
    let currentValue = showLevelUp ? 0 : currentExp;
    intervalId = setInterval(() => {
      if (currentValue + increment >= aimedExp) {
        setCurrentExp(aimedExp);
        clearInterval(intervalId);
      } else {
        currentValue += increment;
        setCurrentExp(currentValue);
      }
    }, showLevelUp ? 15 :25);
    return () => clearInterval(intervalId);
  }, [showLevelUp, endEXP, totalLevelEXP]);

  return (
    <ExpGaugeWrapper>
    {showLevelUp ? 
    <>
      <LevelUpExpBar style={{ width: `${nextExpPercent}%`}} />
      <LevelUpAnimation>Level Up!</LevelUpAnimation>
      <AnimatedUserLevel>Lv {level}</AnimatedUserLevel>
    </>
    :
    <>
      <ExpBar style={{ width: `${expPercent}%`}} />
      <UserLevel>Lv {level}</UserLevel>
    </>
    }
    <ExpText>
      {showLevelUp ? `${currentExp} / ${nextLevelEXP}` : `${currentExp} / ${totalLevelEXP}`}
    </ExpText>
    </ExpGaugeWrapper>
  );
}

export default UserEXP;

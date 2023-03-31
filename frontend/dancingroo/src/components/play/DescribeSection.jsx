import React from "react";
import styled from "styled-components";
import  { Wrapper, H1 } from "../common/ui/Semantics";
import dance from "../../assets/images/017.png"
import mod from "../../assets/images/018.png"
import backtitle from "../../assets/images/backtitle.png";

const DescribeWrapper = styled(Wrapper)`
  width: 100%;
  height: 24rem;
  min-width: 50rem;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffcfd3;
  margin-top: 1rem;
  border-radius: 1rem;
  /* margin-bottom: 2rem; */
`

const ModSection = styled(Wrapper)`
  width: 48%;
  height: 95%;
  min-width: 20rem;
  background-color: #ffffff;
  border-radius: 1rem;
`

const TitleFont = styled(H1)`
  font-family: 'Gosanja' !important;
  background-image:url(${backtitle});
  background-size: 100%;
`

const TextFont = styled.span`
  font-family: 'Gosanja' !important;
  font-size: 1.1rem;
  margin-top: 0.3rem;
  letter-spacing: 0.05rem;
`

const Photo = styled.div`
    height: 10rem;
    width: 10rem;
    margin-bottom: 1rem;
    background-image:url(${(props)=>props.imgUrl});
    background-size: 100%;
`;

function DescribeSection() {
  return (
    <DescribeWrapper>
      <ModSection>
        <TitleFont>들썩들썩 댄스</TitleFont>
        <Photo imgUrl={dance}/>
        <TextFont>신나는 노래에 맞춰 율동 체조!</TextFont>
        <TextFont>율동 동작 정확도에 따라 점수를</TextFont>
        <TextFont>부여받는 모드</TextFont>
      </ModSection>
      <ModSection>
        <TitleFont>으쌰으쌰 놀이</TitleFont>
        <Photo imgUrl={mod}/>
        <TextFont>간단하고 재미있는 동작으로</TextFont>
        <TextFont>몸 쓰는 법을 익혀요</TextFont>
        <TextFont>빅데이터 기반 추천까지!</TextFont>
      </ModSection>
    </DescribeWrapper>
  );
}

export default DescribeSection;

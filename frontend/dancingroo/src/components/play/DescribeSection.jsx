import React from "react";
import styled from "styled-components";
import  { Wrapper, H1 } from "../common/ui/Semantics";

const TitleWrapper = styled(Wrapper)`
  width:100%;
  min-width:32rem;
  height: 16rem;
  align-items: center;
  background-color: ${(props)=>props.color};
  margin-bottom: 3rem;
`

const CenterWrapper = styled(Wrapper)`
  width:60%;
  min-width:32rem;
  height: 16rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

`

const Title = styled(H1)`
  width: 100%;
  font-size: 2.8rem;
  color:#121212;
  font-family: 'BRBA_B' !important;
`

const Text = styled.span`
  font-size: 1.2rem;
  margin-top: 0.1rem;
  letter-spacing: 0.05rem;
  font-family: 'GmarketSansMedium' !important;
`

const Photo = styled.div`
    height: 15rem;
    width: 15rem;
    margin-bottom: 1rem;
    background-image:url(${(props)=>props.imgUrl});
    background-size: cover;
`;

function DescribeSection({imgUrl, title, context, color}) {
  return (
    <TitleWrapper color={color}>
      <CenterWrapper>
        <Photo imgUrl={imgUrl}/>
        <Wrapper>
            <Title>{title}</Title>
            <Text>{context}</Text>
        </Wrapper>
      </CenterWrapper>
    </TitleWrapper>
  );
}

export default DescribeSection;

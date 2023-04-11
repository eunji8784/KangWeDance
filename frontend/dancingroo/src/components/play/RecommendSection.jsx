import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import  { Wrapper } from "../common/ui/Semantics";

const RecommendWrapper = styled(Wrapper)`
  width: 90%;
  display: grid;
  background-color: #FFB0B6;
  border-radius: 1rem;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 3rem;
  padding-left: 3rem;
`

const ItemWrapper = styled(Wrapper)`
`
const InfoWrapper = styled(Wrapper)`
  color: #ffffff;
`

const TextComment = styled.div`
  color: #ffffff;
  font-size: 1.8rem;
  margin-top: 0.5rem;
  letter-spacing: 0.1rem;
  font-family: 'yg-jalnan';

  @font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`

function RecommendSection({recommendData}) {
  const children = useSelector((state) => state.userState.children)
  const select = useSelector((state) => state.userState.select)

  const [numColumns, setNumColumns] = useState(2);

  const item = recommendData ? recommendData[select].recommendationSong : null
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setNumColumns(2);
      } else {
        setNumColumns(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <RecommendWrapper numColumns={numColumns}>
        <ItemWrapper>
          {item && <PlayItem item={item} tags={true} />}
        </ItemWrapper>
        <InfoWrapper>
          <TextComment>데이터 분석을 통한</TextComment>
          <TextComment>{children[select].nickname}(이) 맞춤</TextComment>
          <TextComment>추천 놀이!</TextComment>
        </InfoWrapper>
      </RecommendWrapper>
    </>
  );
}

export default RecommendSection;

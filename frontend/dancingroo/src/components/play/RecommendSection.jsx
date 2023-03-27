import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import  { Wrapper, H1 } from "../common/ui/Semantics";

const RecommendWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
`

const ItemWrapper = styled(Wrapper)`
`
const InfoWrapper = styled(Wrapper)`
  color: #F05475;
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
          {item && <PlayItem item={item} />}
        </ItemWrapper>
        <InfoWrapper>
          <H1>{children[select].nickname} 을/를 위한</H1>
          <H1>추천 놀이!</H1>
        </InfoWrapper>
      </RecommendWrapper>
    </>
  );
}

export default RecommendSection;

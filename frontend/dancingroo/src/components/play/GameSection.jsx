import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper } from "../common/ui/Semantics";
import DescribeSection from "./DescribeSection"

import dance from "../../assets/images/018.png"


const GameWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 2rem;
  margin-bottom: 8rem;
`


function GameSection({gameData}) {

  const [numColumns, setNumColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setNumColumns(3);
      } else if (width >= 768) {
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
      <DescribeSection imgUrl={dance} color="#ECF9FF" title="놀이 모드" 
      context="정확한 자세를 유지해요!"
      context2="빅데이터에 기반한 추천까지!"
      />
      <GameWrapper numColumns={numColumns}>
          {gameData?.map((item) => <PlayItem key={item.songIdx} item={item} tags={true}/>)}
      </GameWrapper>
    </>
  );
}

export default GameSection;

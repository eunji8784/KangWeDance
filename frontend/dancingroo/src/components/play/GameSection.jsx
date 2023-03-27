import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper, H1 } from "../common/ui/Semantics";

const GameWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 1rem;
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
      <H1>으쌰으쌰 놀이</H1>
      <GameWrapper numColumns={numColumns}>
          {gameData?.map((item) => <PlayItem key={item.songIdx} item={item} tags={true}/>)}
      </GameWrapper>
    </>
  );
}

export default GameSection;

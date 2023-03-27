import React from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import {Wrapper, H1} from "../common/ui/Semantics";

const GameWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 10px;
`

function GameSection({gameData}) {

  const numColumns = gameData?.length;

  return (
    <>
      <H1>으쌰으쌰 놀이</H1>
      <GameWrapper numColumns={numColumns}>
          {gameData?.map((item) => <PlayItem key={item.songIdx} item={item} />)}
      </GameWrapper>
    </>
  );
}

export default GameSection;

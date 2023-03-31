import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper, H1 } from "../common/ui/Semantics";
import backtitle from "../../assets/images/backtitle.png";

const TitleWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: baseline;
  justify-content: normal;
  margin-bottom: 2rem;
  /* width: 160%;
  height: 6rem;
  background-color:  #ffcfd3; */
`

const GameWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 2rem;
`

const Title = styled(H1)`
  width: 100%;
  margin-right: 1rem;
  font-size: 2.5rem;
  background-image:url(${backtitle});
  background-size: 100%;
  color:#121212;

  font-family: 'Gosanja' !important;
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
      <TitleWrapper>
        <Title>으쌰으쌰 놀이</Title>
        {/* <span style={{fontSize: `1.2rem`}}>몸을 쓰며 재미있게 놀아요</span> */}
      </TitleWrapper>
      <GameWrapper numColumns={numColumns}>
          {gameData?.map((item) => <PlayItem key={item.songIdx} item={item} tags={true}/>)}
      </GameWrapper>
    </>
  );
}

export default GameSection;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper, H1 } from "../common/ui/Semantics";

const TitleWrapper = styled(Wrapper)`
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: normal;
  margin-bottom: 2rem;
`
const DanceWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 5rem;
`
const Title = styled(H1)`
  margin: 1.5rem 1rem;
  font-size: 2.5rem;
`

function DanceSection({danceData}) {

  const [numColumns, setNumColumns] = useState(2);

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
      <TitleWrapper>
        <Title>들썩들썩 댄스</Title>
        <span style={{fontSize: `1.2rem`}}>노래에 맞춰 춤을 춰봐요</span>
      </TitleWrapper>
      <DanceWrapper numColumns={numColumns}>
        {danceData?.map((item) => <PlayItem key={item.songIdx} item={item} />)}
      </DanceWrapper>
    </>
  );
}

export default DanceSection;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper, H1 } from "../common/ui/Semantics";

const DanceWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 2rem;
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
      <H1>들썩들썩 댄스</H1>
      <DanceWrapper numColumns={numColumns}>
        {danceData?.map((item) => <PlayItem key={item.songIdx} item={item} />)}
      </DanceWrapper>
    </>
  );
}

export default DanceSection;

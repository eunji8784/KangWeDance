import React from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import {Wrapper, H1} from "../common/ui/Semantics";

const DanceWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 10px;
`

function DanceSection({danceData}) {

  const numColumns = danceData?.length;

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

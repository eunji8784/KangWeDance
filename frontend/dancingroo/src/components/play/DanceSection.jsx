import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayItem from "./PlayItem";
import { Wrapper, H1 } from "../common/ui/Semantics";
import dance from "../../assets/images/017.png"
import DescribeSection from "./DescribeSection"

const DanceWrapper = styled(Wrapper)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 5rem;
  margin-bottom: 8rem;
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
    <DescribeSection imgUrl={dance} color="#FFFBEB" title="댄스 모드" 
    context="신나는 노래에 맞춰 율동 체조!"/>
      <DanceWrapper numColumns={numColumns}>
        {danceData?.map((item) => <PlayItem key={item.songIdx} item={item} />)}
      </DanceWrapper>
    </>
  );
}

export default DanceSection;

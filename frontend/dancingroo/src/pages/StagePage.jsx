import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DanceMode from "../components/stage/DanceMode";
import CountMode from "../components/stage/CountMode";
import Timemode from "../components/stage/TimeMode";
import RaceMode from "../components/stage/RaceMode";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StagePage() {
    const params = useParams();
    return (
        <Wrapper>
          {params.modeId === "0" && <DanceMode/>}
          {params.modeId === "1" && <CountMode/>}
          {params.modeId === "2" && <Timemode/>}
          {params.modeId === "3" && <RaceMode/>}
        </Wrapper>
    );
}

export default StagePage;

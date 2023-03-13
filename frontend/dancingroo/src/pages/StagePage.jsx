import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DanceMode from "../components/modes/DanceMode";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StagePage(props) {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params)
    return (
        <Wrapper>
          {params.modeId === "0" && <DanceMode/>}
        </Wrapper>
    );
}

export default StagePage;

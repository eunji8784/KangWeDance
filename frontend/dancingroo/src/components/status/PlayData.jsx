import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function PlayData(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            운동기록
            
        </Wrapper>
    );
}

export default PlayData;

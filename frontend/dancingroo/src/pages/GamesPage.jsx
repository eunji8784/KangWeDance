import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function GamesPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            GamesPage
        </Wrapper>
    );
}

export default GamesPage;

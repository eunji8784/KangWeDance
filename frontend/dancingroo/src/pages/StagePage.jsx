import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StagePage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            StagePage
        </Wrapper>
    );
}

export default StagePage;

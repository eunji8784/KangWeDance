import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: ${( { display } ) => display ?? 'flex'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border:1px solid black;
`;

function InputModal(props) {
    const navigate = useNavigate();
    return (
        <Wrapper display={props.display}>
            모달
        </Wrapper>
    );
}

export default InputModal;

import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function OauthNaver(props) {
    // const navigate = useNavigate();
    return (
        <Wrapper>
            네이버 로그인
        </Wrapper>
    );
}

export default OauthNaver;

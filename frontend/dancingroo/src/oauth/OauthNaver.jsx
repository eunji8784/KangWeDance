import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

function OauthNaver(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            네이버 로그인
        </Wrapper>
    );
}

export default OauthNaver;

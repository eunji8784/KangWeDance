import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

function OauthKakao(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            카카오로그인
        </Wrapper>
    );
}

export default OauthKakao;

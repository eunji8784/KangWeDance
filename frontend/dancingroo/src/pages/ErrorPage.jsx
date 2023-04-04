import React from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import {Wrapper} from "../components/common/ui/Semantics";

function ErrorPage() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            ErrorPage
            <p onClick={()=>navigate('/')}>
            홈으로 이동
            </p>
        </Wrapper>
    );
}

export default ErrorPage;

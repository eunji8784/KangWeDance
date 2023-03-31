import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Header, Main, Article, Section, H1, H2, P, Footer} from "../components/common/ui/Semantics";

function ErrorPage(props) {
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

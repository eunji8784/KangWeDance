import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Header, Main, Article, Section, H1, H2, P, Footer} from "../components/common/ui/Semantics";

function ErrorPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            ErrorPage
        </Wrapper>
    );
}

export default ErrorPage;

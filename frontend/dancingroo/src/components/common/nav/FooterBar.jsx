import React from "react";
import styled from "styled-components";
// import {Wrapper, Header, Main, Article, Section, H1, H2, P, Footer} from "../components/common/ui/Semantics";
const Section = styled.footer`
    position: absolute;
    bottom: 0;
    width: 150%;
    height: 5rem;
    background-color: #ffcfd3;
`;

function FooterBar(props) {
    return (
        <Section>
            BottomBar
        </Section>
    );
}

export default FooterBar;

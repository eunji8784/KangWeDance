import React from "react";
import styled from "styled-components";

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

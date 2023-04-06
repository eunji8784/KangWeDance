import React from "react";
import styled from "styled-components";

const Section = styled.footer`
    position: absolute;
    bottom: 0;
    width: 144%;
    height: 8rem;
    background-color: #fff6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Links = styled.div`
    color: #9c9c9c;
    font-size: 0.9rem;
`

const Infos = styled.div`
    font-size: 1rem;
    margin: 1rem;
    color: #727272;
    font-family:'GmarketSansMedium';
`

function FooterBar() {
    return (
        <Section>
            <span>
                <Infos> 팀 캥거루 합창단 | 대표자 김은지  </Infos>
                <Links>ⓒ Kang We Dance. All Rights Reserved.</Links>
            </span>    
            <Links> 본 컨텐츠의 저작권은 저자 또는 제공처에 있으며, 이를 무단 이용하는 경우 저작권등에 따라 법적 책임을 질 수 있습니다. </Links>
        </Section>
    );
}

export default FooterBar;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper, PinkButton } from "../common/ui/Semantics";

const MainSection = styled(Wrapper)`
    width: 60%;
    margin-top: 1rem;
`

const ButtonSection = styled(Wrapper)`
    flex-direction: row;
    justify-content: end;
    width: 32rem;
`

const Button = styled(PinkButton)`
    width: 5rem;
`

const Photo = styled.div`
    height: 18rem;
    width: 32rem;
    background-image:url(${(props)=>props.imge});
    background-size:cover;
    filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
`;

function Deco({imge}) {

    return (
        <MainSection>
            <ButtonSection>
                <Button type="button" value="공유하기"/>
                <Button type="button" value="다운로드"/>
            </ButtonSection> 
            <Photo imge={imge}/>
        </MainSection>
    );
}

export default Deco;
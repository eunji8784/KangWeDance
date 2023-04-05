import React from "react";
import styled from "styled-components";
import {Wrapper} from "../components/common/ui/Semantics";
import eastereggJpg from "../assets/images/easteregg.jpg"
import { H1, P } from "../components/common/ui/Semantics";

const ErrorWrapper = styled(Wrapper)`
    margin-top: 5%;
    height: 80%;
`

const ErrorImage = styled.img`
    height: 80%;
`

const ErrorMessage = styled(P)`
    
`

function ErrorPage() {
    return (
        <ErrorWrapper>
            <ErrorMessage>잘못된 접근입니다</ErrorMessage>
            <ErrorImage src={eastereggJpg} alt="background" />
            <H1>팀 캥거루합창단</H1>
        </ErrorWrapper>
    );
}

export default ErrorPage;

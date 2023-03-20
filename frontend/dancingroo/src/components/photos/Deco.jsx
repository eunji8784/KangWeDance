import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

const MainSection = styled(Wrapper)`
    width: 60%;
`


function Deco(props) {

    return (
        <MainSection>
            Deco
        </MainSection>
    );
}

export default Deco;
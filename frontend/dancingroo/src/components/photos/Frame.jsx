import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

const SideSection = styled(Wrapper)`
    width:4rem;
`

function Frame(props) {

    return (
        <SideSection>
            프레임
        </SideSection>
    );
}

export default Frame;

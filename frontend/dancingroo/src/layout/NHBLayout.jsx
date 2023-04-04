import React from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/common/nav/HeaderBar";
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    // @ 양 옆 마진
    margin:0 15% !important;
    z-index:2;
`;
const OutletWrapper = styled(Outlet)`
`

const NHBLayout = () => {

    return(
        <Bodysuit>
            <HeaderBar onlyTopBar={true}/>
            <OutletWrapper/>
        </Bodysuit>
    )

}

export default NHBLayout;

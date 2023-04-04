import React from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/common/nav/HeaderBar";
// import FooterBar from "../components/common/nav/FooterBar";
import styled from "styled-components";
import ChildProfile from "../components/common/ui/ChildProfile";
import NoteCompo from "../components/common/effects/NoteCompo";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    // @ 양 옆 마진
    margin:0 15% !important;
    position: relative;
    min-height: 100vh;
    padding-bottom: 5rem;
`;

const OutletWrapper = styled(Outlet)`
`;

const HBLayout = ({watchingPage}) => {

    return(
        <>
            <Bodysuit>
                <HeaderBar watchingPage={watchingPage}/>
                <ChildProfile/>
                <NoteCompo/>
                <OutletWrapper />
            </Bodysuit>
            {/* <FooterBar/>      */}
        </>
    )

}

export default HBLayout;

import React, { useState } from "react";
// {useEffect} from "react";
import { Outlet } from "react-router-dom";
// import { useNavigate,  } from "react-router-dom";
// import { useSelector } from "react-redux";
// import TopBar from "../components/common/nav/TopBar";
import HeaderBar from "../components/common/nav/HeaderBar";
import FooterBar from "../components/common/nav/FooterBar";
import styled from "styled-components";
import ChildProfile from "../components/common/ui/ChildProfile";
import NoteCompo from "../components/common/effects/NoteCompo";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* justify-items: center; */
    height: 100vh;
    /* position: relative; */
    // @ 양 옆 마진
    /* padding-top: 8rem; */
    margin:0 15% !important;
    /* border: 1px solid blue; */
    position: relative;
    min-height: 100vh;
    padding-bottom: 5rem;
`;

const OutletWrapper = styled(Outlet)`
    /* min-height: calc(100vh- 500px);s */
`

const HBLayout = (props) => {
    const {watchingPage} = props;
    // const [watching, setWatching] = useState(watchingPage)
    // const navigate = useNavigate();
    // const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);
    
    // useEffect(()=>{
    //     if(isLoggedIn){
    //         navigate("/");
    //     }
    // }, [isLoggedIn])

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

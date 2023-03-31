import React from "react";
// {useEffect} from "react";
import { Outlet } from "react-router-dom";
// import { useNavigate,  } from "react-router-dom";
// import { useSelector } from "react-redux";
import TopBar from "../components/common/nav/TopBar";
import BottomBar from "../components/common/nav/BottomBar";
import styled from "styled-components";
// import ChildProfile from "../components/common/ui/ChildProfile";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    // @ 양 옆 마진
    margin:0 15% !important;
    z-index:2;
    /* border: 1px solid blue; */
`;
const OutletWrapper = styled(Outlet)`
`

const HBLayout = () => {
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     if(isLoggedIn){
    //         navigate("/");
    //     }
    // }, [isLoggedIn])

    return(
        <Bodysuit>
            <TopBar/>
            {/* <HeaderBar/> */}
            {/* <ChildProfile/> */}
            <OutletWrapper/>
            {/* <BottomBar/> */}
        </Bodysuit>
    )

}

export default HBLayout;

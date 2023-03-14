import React from "react";
// {useEffect} from "react";
import { Outlet } from "react-router-dom";
// import { useNavigate,  } from "react-router-dom";
// import { useSelector } from "react-redux";
import TopBar from "../components/common/nav/TopBar";
import HeaderBar from "../components/common/nav/HeaderBar";
import styled from "styled-components";
import ChildProfile from "../components/common/ui/ChildProfile";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* width: 80vw; */
    /* overflow-x: hidden; */
    margin:0 8% !important;
    /* border: 1px solid blue; */
`;
const OutletWrapper = styled(Outlet)`
     
`

const HBLayout = () => {
    // const navigate = useNavigate();
    // const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);

    // useEffect(()=>{
    //     if(isLoggedIn){
    //         navigate("/");
    //     }
    // }, [isLoggedIn])

    return(
        <Bodysuit>
            {/* display = false로 넘기면 하단 메뉴 안나옴 */}
            {/* <TopBar/> */}
            <HeaderBar/>
            <ChildProfile/>
            <OutletWrapper/>
        </Bodysuit>
    )

}

export default HBLayout;

import React from "react";
// {useEffect} from "react";
import { Outlet } from "react-router-dom";
// import { useNavigate,  } from "react-router-dom";
// import { useSelector } from "react-redux";
import TopBar from "../components/common/nav/TopBar";
import HeaderBar from "../components/common/nav/HeaderBar";
import styled from "styled-components";
import ChildProfile from "../components/common/ui/ChildProfile";

// const Bodysuit = styled.div`
//     position: relative;
// `;

// const HeaderWrapper = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 60px;
//     background-color: #F05475;
// `;

// const ProfileWrapper = styled.div`
//     position: fixed;
//     top: 60px;
//     left: 0;
//     width: 250px;
//     height: calc(100vh - 60px);
//     background-color: #FFFFFF;
// `;

// const OutletWrapper = styled(Outlet)`
//     margin-left: 250px;
//     padding: 20px;
// `;

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    /* box-sizing:border-box; */
    /* overflow-x: hidden; */
    // @ 양 옆 마진
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

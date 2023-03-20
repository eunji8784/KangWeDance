import React, { useState } from "react";
// {useEffect} from "react";
import { Outlet } from "react-router-dom";
// import { useNavigate,  } from "react-router-dom";
// import { useSelector } from "react-redux";
import TopBar from "../components/common/nav/TopBar";
import HeaderBar from "../components/common/nav/HeaderBar";
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    // @ 양 옆 마진
    margin:0 8% !important;
    /* border: 1px solid blue; */
`;
const OutletWrapper = styled(Outlet)`
`

const PHBLayout = (props) => {
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
        <Bodysuit>
            <HeaderBar watchingPage={watchingPage}/>
            <OutletWrapper />
        </Bodysuit>
    )

}

export default PHBLayout;

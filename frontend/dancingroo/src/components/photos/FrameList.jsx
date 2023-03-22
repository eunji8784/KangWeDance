import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

import {MdDoNotDisturb} from "react-icons/md";
import fd1 from "../../assets/images/fd1.png"
import fd2 from "../../assets/images/fd2.png"
import fd3 from "../../assets/images/fd3.png"
import fd4 from "../../assets/images/fd4.png"
import {MdLock} from 'react-icons/md'

const SideSection = styled(Wrapper)`
`

const FrameItem = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    background-image:url(${(props)=>props.imageUrl});
    background-size:cover;
    filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
    border-radius: 0.2rem;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const LockFrameItem = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    background-image:url(${(props)=>props.imageUrl});
    background-size:cover;
    filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
    border-radius: 0.2rem;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Gary = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    background-color:rgba(0, 0, 0, 0.2);
    background-size:cover;
    border-radius: 0.2rem;
`;

function FrameList(props) {
    const {handleFrame} = props;

    //더미
    const frames = [
        {
            imageUrl : fd1,
            lock : false
        },
        {
            imageUrl : fd2,
            lock : false
        },
        {
            imageUrl : fd3,
            lock : false
        },
        {
            imageUrl : fd4,
            lock : false
        }

    ]
    
    const handleClick = (imageUrl)=>{
        handleFrame(imageUrl)
    }

    return (
        <SideSection>
            <MdDoNotDisturb color="#F05475" style={{margin:'1rem'}} size="30" onClick={()=>handleClick()}/>
            {frames.map((frame, key) => {
                return ( frame.lock ?
                    <LockFrameItem key={key} imageUrl={frame.imageUrl}>
                        <Gary>
                            <MdLock size="30"/>
                        </Gary>
                    </LockFrameItem>
                    :
                    <FrameItem key={key} imageUrl={frame.imageUrl} onClick={()=>handleClick(frame.imageUrl)}/>
                )
            })}
        </SideSection>
    );
}

export default FrameList;

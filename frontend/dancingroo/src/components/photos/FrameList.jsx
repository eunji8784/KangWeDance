import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

import {MdDoNotDisturb} from "react-icons/md";
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

function FrameList({handleFrame, frameList}) {
    return (
        <SideSection>
            <MdDoNotDisturb color="#F05475" style={{margin:'1rem'}} size="30" onClick={()=>handleFrame()}/>
            {frameList.map((frame, key) => {
                return ( frame.unLock ?
                    <FrameItem key={key} imageUrl={frame.frameURL} onClick={()=>handleFrame(frame.frameURL)}/>
                    :
                    <LockFrameItem key={key} imageUrl={frame.frameURL}>
                        <Gary>
                            <MdLock size="30"/>
                        </Gary>
                    </LockFrameItem>
                )
            })}
        </SideSection>
    );
}

export default FrameList;

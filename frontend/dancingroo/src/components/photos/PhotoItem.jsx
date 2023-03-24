import React, { useState } from "react";
import styled from "styled-components";


const Photo = styled.div`
    /* height: ${window.innerWidth*0.2557};
    width:${window.innerWidth/2.2}; */
    height: 7.2rem;
    width: 12.8rem;
    background-image:url(${(props)=>props.imgUrl});
    background-size: 100%;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.2rem;
`;

const DateText = styled.div`
    display: flex;
    width: 12rem;
    justify-content: flex-start;
    font-size: 0.9rem;
    color: #2d2d2d;
    margin-top: 1rem;
`;

function PhotoItem({imgUrl, newDay, date, handleImge}) {

    return (
        <>
            {newDay && <DateText>{date}</DateText>}
            <Photo imgUrl={imgUrl} onClick={()=>handleImge(imgUrl)}/>
        </>
    );
}

export default PhotoItem;
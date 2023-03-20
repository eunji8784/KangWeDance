import React, { useState } from "react";

const Gallery = styled.div`
    background-image:url(${(props)=>props.imageUrl});
    background-size:cover;
    filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
`;

const DateText = styled.div`
    font-size: 1rem;
    color: #2d2d2d;
    margin-top: 1rem;
`;

function GalleryItem({imageUrl, newDate, date}) {
    return (
        <>
            {newDate && <DateText>{date}</DateText>}
            <Gallery imageUrl={imageUrl}/>
        </>
    );
}

export default GalleryItem;
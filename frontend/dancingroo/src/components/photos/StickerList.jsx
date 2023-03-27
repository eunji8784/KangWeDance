import React from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

const AlbumContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
`
const StickerItem = styled.div`
    height: 4rem;
    width: 4rem;
    background-image:url(${(props)=>props.imageUrl});
    background-size:cover;
    cursor: pointer;
    margin: 0.5rem;
`;

function StickerList({handleSticker, stickerList}) {
    return (
        <Wrapper>
            <AlbumContainer>
                {stickerList?.map((sticker, index) => {
                    return <StickerItem key={index} imageUrl={sticker.frameURL} onClick={()=>handleSticker(`https://d6jyvlc4duh9a.cloudfront.net/` + sticker.frameURL.substr(52 , sticker.frameURL.length))}/>;
                })}
            </AlbumContainer>
        </Wrapper>
    );
}

export default StickerList;
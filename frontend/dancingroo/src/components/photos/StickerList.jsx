import React, { useEffect, useState } from "react";
import { Wrapper } from "../common/ui/Semantics";
import styled from "styled-components";


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
                    return <StickerItem key={index} imageUrl={sticker.frameURL} onClick={()=>handleSticker(sticker.frameURL)}/>;
                })}
            </AlbumContainer>
        </Wrapper>
    );
}

export default StickerList;
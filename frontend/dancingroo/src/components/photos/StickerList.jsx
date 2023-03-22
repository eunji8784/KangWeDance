import React, { useEffect, useState } from "react";
import { Wrapper } from "../common/ui/Semantics";
import styled from "styled-components";

import one from "../../assets/images/one.png"
import two from "../../assets/images/two.png"
import three from "../../assets/images/three.png"
import four from "../../assets/images/four.png"

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

function StickerList(props) {
    const {handleSticker} = props;
    //더미
    const stickers = [
        {
            imageUrl : one,
        },
        {
            imageUrl : two,
        },
        {
            imageUrl : three,
        }
        ,
        {
            imageUrl : four,
        }
    ]

    const handleClick = (imge) => {
        handleSticker(imge);   
    };

    return (
        <Wrapper>
            <AlbumContainer>
                {stickers.map((sticker, index) => {
                    return <StickerItem key={index} imageUrl={sticker.imageUrl}  onClick={()=>handleClick(sticker.imageUrl)}/>;
                })}
            </AlbumContainer>
        </Wrapper>
    );
}

export default StickerList;
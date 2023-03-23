import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Wrapper, PinkButton } from "../common/ui/Semantics";
import { Stage, Layer, Image } from "react-konva";
import useImage from 'use-image';

import {MdCleaningServices} from 'react-icons/md';

const MainSection = styled(Wrapper)`
    width: 60%;
    height: 100%;
    min-width: 25rem;
    justify-content: start;
    border-right: solid 0.2rem #ffeef2;
`

const ButtonSection = styled(Wrapper)`
    flex-direction: row;
    justify-content: end;
    width: 90%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #F05475;
`

const Card = styled.div`
    width: 80%;
`;

const BackGroungImage = ({ image }) => {
    const [img] = useImage(image);
    return (
      <Image
        image={img}
        width={window.innerWidth/2.2}
        height={window.innerWidth*0.2557}
      />
    );
};

  //움직이는 도형 컨포넌트
  const Rectangle = ({ url, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
  
    useEffect(() => {
      if (isSelected) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    const [img] = useImage(url);
    return (
        <>
        {!onSelect ?
            null :
            <Image
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            draggable
            onDragEnd={(e) => {
                onChange({
                    url,
                    x: e.target.x(),
                    y: e.target.y()
                });
            }}
            image={img}
            width={window.innerWidth/10}
            height={window.innerWidth/10}
            />
        }
        </>
    );
  };

function RightArea({imge, frameImage, stickerImage, stickerNum}) {
    const stageRef = useRef();
    const [base64, setBase64] = useState();
    const [resize, setResize] = useState();
    const [rectangles, setRectangles] = useState([]);
    const [selectedId, selectShape] = useState(null);

    useEffect(() => {
        setRectangles(rectangles.concat({
            x: 0,
            y: 0,
            id: rectangles.length+1,
            url: stickerImage
        }))
      }, [stickerNum]);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage;
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);    
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    const handleResize = () => {
        // rectangles.map((rect) => {
        //     rect.x = rect.x + window.innerWidth/10;
        //     rect.y = rect.y + window.innerWidth/10;
        // })
      setResize(window.innerWidth);
    };
    
    const downloadURI = async() => {
        const uri = stageRef.current.toDataURL();
        setBase64(uri);
    };

    const cleanSticker = () => {
        setRectangles([]);
    }

    return (
        <MainSection>
            <ButtonSection>
                <PinkButton>공유하기</PinkButton>
                <PinkButton onClick={downloadURI}>다운로드</PinkButton>
            </ButtonSection>
             <Card 
             onMouseDown={checkDeselect} 
             onTouchStart={checkDeselect}
             >
                    <Stage
                        width={window.innerWidth/2.2}
                        height={window.innerWidth*0.2557}
                        ref={stageRef}
                        >
                        <Layer> 
                            <BackGroungImage image={imge}/>
                            <BackGroungImage image={frameImage}/>
                            {rectangles.map((rect, i) => {
                            return (
                                <Rectangle
                                    key={i}
                                    url={rect.url}
                                    isSelected={rect.id === selectedId}
                                    onSelect={() => {
                                        selectShape(rect.id);
                                    }}
                                    onChange={(newAttrs) => {
                                        const rects = rectangles.slice();
                                        rects[i] = newAttrs;
                                        setRectangles(rects);
                                    }}
                                />
                            );
                         })}
                        </Layer>
                    </Stage>
            </Card>
            <ButtonSection>
                스티커 전체 삭제
                <MdCleaningServices color="#F05475" size="30" onClick={()=>cleanSticker()}/>
            </ButtonSection>
            <img src = {base64}/>
        </MainSection>
    );
}

export default RightArea;
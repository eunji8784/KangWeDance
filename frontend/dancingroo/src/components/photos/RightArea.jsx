import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Wrapper, PinkButton } from "../common/ui/Semantics";
import { Stage, Layer, Image, Rect } from "react-konva";
import useImage from 'use-image';

import two from "../../assets/images/two.png"

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
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const Card = styled.div`
    width: 80%;
`;

const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };
  

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

function RightArea({imge, frameImage}) {
    const dragUrl = useRef();
    const stageRef = useRef();
    const layertRef = useRef(null);
    const [images, setImages] = useState([]);
    const [base64, setBase64] = useState();
    const [resize, setResize] = useState();

    
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
      setResize(window.innerWidth);
    };
    
    const downloadURI = async() => {
        const uri = stageRef.current.toDataURL();
        setBase64(uri);
    };

    //이미지 드랍해서 추가
    const drop = (e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        setImages(
          images.concat([
            {
              ...stageRef.current.getPointerPosition(),
              src: dragUrl.current,
            },
          ])
        );
    }

    const drag = (e) => {
        e.preventDefault();
    }

    return (
        <MainSection>
            <ButtonSection>
                <PinkButton>공유하기</PinkButton>
                <PinkButton onClick={downloadURI}>다운로드</PinkButton>
            </ButtonSection>
            {/* <img
                src={two}
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> */}
             <Card onDrop={drop} onDragOver={drag}>
                    <Stage
                        width={window.innerWidth/2.2}
                        height={window.innerWidth*0.2557}
                        ref={stageRef}
                        >
                        <Layer ref={layertRef}> 
                            <BackGroungImage image={imge}/>
                            <BackGroungImage image={frameImage}/>
                            {images.map((image, key) => {
                            return <URLImage key={key} image={image} />;
                            })}
                        </Layer>
                    </Stage>
            </Card>

            {/* <img src = {imge}/> */}
            <img src = {base64}/>
        </MainSection>
    );
}

export default RightArea;
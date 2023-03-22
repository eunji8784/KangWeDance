import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Wrapper, PinkButton } from "../common/ui/Semantics";
// import html2canvas from "html2canvas";
// import { Stage, Layer, Image } from 'react-konva';
// import useImage from 'use-image';

const MainSection = styled(Wrapper)`
    width: 60%;
    height: 100%;
    min-width: 5rem;
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
  position: relative;
  width: 80%;
  height: 0;
  padding-bottom: 45%;
`;

const ImageFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image:url(${(props)=>props.imageUrl});
  background-size:cover;
  #canvas{
    border: 1rem solid red;
  }
`;

const Sticker = styled.div`
    position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: solid 0.1rem red;
`;

// const URLImage = ({ image }) => {
//     const [img] = useImage(image.src);
//     return (
//       <Image
//         image={img}
//         x={image.x}
//         y={image.y}
//         offsetX={img ? img.width / 2 : 0}
//         offsetY={img ? img.height / 2 : 0}
//       />
//     );
//   };
  
function RightArea({imge, frameImage}) {
    const dragUrl = useRef();
    const stageRef = useRef();
    const [images, setImages] = useState([]);
    const [base64, setBase64] = useState();
     
    // const imgeDownload = async() => {
    //     await html2canvas(document.getElementById("card"))
    //     .then(function(canvas) {
    //         setBase64(canvas.toDataURL("image/png"));
    //     });
    // };

    // const a = (e) => {
    //     e.preventDefault();
    //     // register event position
    //     stageRef.current.setPointersPositions(e);
    //     // add image
    //     setImages(
    //       images.concat([
    //         {
    //           ...stageRef.current.getPointerPosition(),
    //           src: dragUrl.current,
    //         },
    //       ])
    //     );
      
    // }

    // const b = (e) => {
    //     e.preventDefault();
    // }

    return (
        <MainSection>
            <ButtonSection>
                <PinkButton>공유하기</PinkButton>
                {/* <Button type="button" value="다운로드" onClick={imgeDownload}/> */}
            </ButtonSection>
            {/* <img
                alt="lion"
                src="https://konvajs.org/assets/lion.png"
                draggable="true"
                onDragStart={(e) => {
                dragUrl.current = e.target.src;
                }}
            /> */}
            <Card id="card">
                <ImageFrame imageUrl={imge}/>
                <ImageFrame imageUrl={frameImage}/>
                {/* <div  onDrop={a} onDragOver={b}>
                    <Stage
                    width={100}
                    height={window.innerHeight}
                    style={{ border: '1px solid grey' }}
                    ref={stageRef}
                    >
                    <Layer>
                        {images.map((image) => {
                        return <URLImage image={image} />;
                        })}
                    </Layer>
                    </Stage>
                </div> */}
            </Card>
            <img src = {base64}/>
        </MainSection>
    );
}

export default RightArea;
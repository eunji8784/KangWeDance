import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Wrapper, PinkButton } from "../common/ui/Semantics";
import { Stage, Layer, Image } from "react-konva";
import useImage from 'use-image';
import useApi from "../../hooks/auth/useApi"
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
    width : ${window.innerWidth/2.2};
    height : ${window.innerWidth*0.2557};
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
`;

const BackGroungImage = ({ image }) => {
    const [img] = useImage(image, 'Anonymous');
    return (
      <Image
        image={img}
        width={window.innerWidth/2.2}
        height={window.innerWidth*0.2557}
      />
    );
};

  //움직이는 도형 컨포넌트
  const Rectangle = ({ url, onSelect, onChange }) => {
    const shapeRef = useRef();
    
    const [img] = useImage(url, 'Anonymous');
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
            width={window.innerWidth/18}
            height={window.innerWidth/18}
            />
        }
        </>
    );
  };

function RightArea({imge, frameImage, stickerImage, stickerNum}) {
    const stageRef = useRef();
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
    
    const cleanSticker = () => {
        setRectangles([]);
    }

    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
      }

    const downloadImage = () => {
        const url = stageRef.current.toDataURL();
        const today = new Date();
        const year = today.getFullYear(); // 년도
        const month = today.getMonth() + 1;  // 월
        const date = today.getDate();  // 날짜
    
        downloadURI(url, 'KangWeDance'+ year + month + date);
        
    }

    const shareImage = () =>{
        getUrl();
        kakaoShare();
    }

    const getImageUrl = useApi()
    const getUrl = () => {
        const base64 = stageRef.current.toDataURL();
        fetch(base64)
        .then(res => res.blob())
        .then(blob => {
          const fd = new FormData();
          const file = new File([blob], "filename.png");
          fd.append('image', file)
          console.log("Dd")
          console.log(fd)
        //   getImageUrl.fetchApi('POST', `/children/profile`, {file:fd})
        })
    }

    const kakaoShare = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init('710e5b0067f96bfdfa687085d33b61a7')
            }
            
            kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                  title: '오늘의 기록',
                  description: '캥위댄스에서 편지가 왔어요',
                  imageUrl:
                    'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
                  link: {
                    mobileWebUrl: 'https://developers.kakao.com',
                    webUrl: 'https://developers.kakao.com',
                  },
                },
                buttons: [
                  {
                    title: '다운로드하기',
                    link: {
                      mobileWebUrl: 'https://developers.kakao.com',
                      webUrl: 'https://developers.kakao.com',
                    },
                  },
                ],
            })
         }
    }

    return (
        <MainSection>
            <ButtonSection>
                <PinkButton onClick={shareImage}>공유하기</PinkButton>
                <PinkButton onClick={downloadImage}>다운로드</PinkButton>
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
                <span onClick={()=>cleanSticker()}>
                    스티커 전체 삭제
                    <MdCleaningServices color="#F05475" size="30"/>
                </span>
            </ButtonSection>
        </MainSection>
    );
}

export default RightArea;
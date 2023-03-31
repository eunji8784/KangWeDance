import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Stage, Layer, Image } from "react-konva";
import useImage from 'use-image';
import Swal from "sweetalert2";

import { Wrapper, PinkButton } from "../common/ui/Semantics";
import axios from "axios";

import {MdCleaningServices} from 'react-icons/md';

const MainSection = styled(Wrapper)`
    width: 70%;
    height: 100%;
    min-width: 36rem;
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

function RightArea({image, frameImage, stickerImage, stickerNum}) {
    const stageRef = useRef();
    const [resize, setResize] = useState();
    const [rectangles, setRectangles] = useState([]);
    const [selectedId, selectShape] = useState(null);

    //화면 크기에 따라 사이즈 변화시키기
    useEffect(() => {
        window.addEventListener("resize", handleResize);    
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //화면 크기 변화시키기
    const handleResize = () => {
        // rectangles.map((rect) => {
        //     rect.x = rect.x + window.innerWidth/10;
        //     rect.y = rect.y + window.innerWidth/10;
        // })
      setResize(window.innerWidth);
    };
    
    //스티커 추가했을때
    useEffect(() => {
        setRectangles(rectangles.concat({
            x: 0,
            y: 0,
            id: rectangles.length+1,
            url: stickerImage
        }))
    }, [stickerNum]);

    //스티커 전삭
    const cleanSticker = () => {
        setRectangles([]);
    }

    //스티커 누르고 위치 변경할때
    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage;
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    //이미지 다운로드
   const downloadImage = () => {
    if (image !== 'https://d3qb4vbeyp8phu.cloudfront.net/photoInit.png'){        
       const url = stageRef.current.toDataURL();
       const today = new Date();
       const year = today.getFullYear(); // 년도
       const month = today.getMonth() + 1;  // 월
       const date = today.getDate();  // 날짜
       downloadURI(url, 'KangWeDance'+ year + month + date);   
    } else {
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#F05475 ',
            text: '기본 이미지 입니다!', 
            confirmButtonColor: '#F05475 ',
            confirmButtonText: '확인',
          });
    }
   }

    //이미지 uri 다운로드 함수
    const downloadURI = (uri, name) => {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
      }

    //이미지 공유
    const [shareImageUrl, setShareImageUrl] = useState();
    const shareImage = async () => {
        if (image !== 'https://d3qb4vbeyp8phu.cloudfront.net/photoInit.png'){
            const base64 = stageRef.current.toDataURL();
            const url = "https://kangwedance.site/dev/children/profile";
            var arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            const file = new File([u8arr], "카카오공유", {type:mime});
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(url, formData);
                setShareImageUrl(response.data.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            Swal.fire({
                icon: 'warning',               
                width: 300,
                iconColor: '#F05475 ',
                text: '기본 이미지 입니다!', 
                confirmButtonColor: '#F05475 ',
                confirmButtonText: '확인',
              });
        }
    }
    
    useEffect(() => {
        if (shareImageUrl && window.Kakao) {
            const kakao = window.Kakao
            if (!kakao.isInitialized()) {
                kakao.init('710e5b0067f96bfdfa687085d33b61a7')
            }
            
            kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                  title: '오늘의 기록',
                  description: '캥위댄스에서 편지가 왔어요',
                  imageUrl: shareImageUrl,
                  link: {
                      mobileWebUrl: shareImageUrl,
                      webUrl: shareImageUrl,
                    }
                },
                buttons: [
                  {
                    title: '다운로드하기',
                    link: {
                      mobileWebUrl: shareImageUrl,
                      webUrl: shareImageUrl,
                    },
                  },
                ],
            })
         }
    }, [shareImageUrl]);

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
                            <BackGroungImage image={image}/>
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
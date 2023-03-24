import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";
import PhotoItem from "./PhotoItem"


const Empty = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`;

function PhotoList({handleImge, photoList}) {
    const [newDay, setNewDay] = useState([]);
    
    //스티커랑 프레임 리스트
    useEffect(()=>{
        if (photoList.length !== 0) {
            var arr = [];
            var date = '';
            for (var i = 0; i < photoList.length; i++) {
                if(date != photoList[i].createDate){
                    arr.push(true);
                    date = photoList[i].createDate;
                } else{
                    arr.push(false);
                }
            }
            setNewDay(arr) 
        }

    },[photoList])

    return (
        <Wrapper>
            {photoList?
                photoList.map((photo, index) => {
                return <PhotoItem handleImge={handleImge} key={index} date={photo.createDate} imgUrl={photo.photoImageUrl} newDay={newDay[index]} 
                photoIdx = {photo.photoIdx}/>;
                })
                :
                <Empty>
                    아직 사진이 없어요!
                </Empty>
            }
        </Wrapper>
    );
}

export default PhotoList;
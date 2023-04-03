import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";
import PhotoItem from "./PhotoItem"
import {AiFillPlusCircle} from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { photoPageNum } from "../../store/photoSlice";

const PhotoWrapper = styled(Wrapper)`
    padding-bottom: 5rem;
`;

const Empty = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
`;

const PlusWrapper = styled(Wrapper)`
    margin: 1rem;
`;

function PhotoList({handleImge, photoList, plus}) {
    const dispatch = useDispatch()
    const [newDay, setNewDay] = useState([]);

    //같은 날짜 사진들은 날짜 하나만 출력
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

    const clickPlus = () => {
        dispatch(photoPageNum())
    }

    return (
        <PhotoWrapper>
            {photoList.length?
                <>
                {
                    photoList.map((photo, index) => {
                    return <PhotoItem handleImge={handleImge} key={index} date={photo.createDate} imgUrl={photo.photoImageUrl} newDay={newDay[index]} 
                    photoIdx = {photo.photoIdx}/>;
                    })
                }
                { plus ?
                    <PlusWrapper>
                        <AiFillPlusCircle color="#F05475" size="38" onClick={clickPlus}/>
                    </PlusWrapper>
                    :
                    null
                }
                </>
                :
                <Empty>
                    아직 사진이 없어요!
                </Empty>
            }
        </PhotoWrapper>
    );
}

export default PhotoList;
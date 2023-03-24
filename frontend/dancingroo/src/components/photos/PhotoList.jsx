import React, { useEffect, useState } from "react";
import { Wrapper } from "../common/ui/Semantics";
import PhotoItem from "./PhotoItem"

function PhotoList({handleImge, photoList}) {
    const [newDay, setNewDay] = useState([]);
    const [date, setDate] = useState("");
    
    //스티커랑 프레임 리스트
    useEffect(()=>{
        if (photoList) {
            var arr = [];
            for (var i = 0; i < photoList.length; i++) {
                if(date !== photoList[i].createDate){
                    arr.push(true);
                    setDate(photoList[i].createDate);
                    // console.log(newDay) 
                } else{
                    arr.push(false);
                }
            }
            setNewDay(arr);
        }
    },[photoList])

    return (
        <Wrapper>
            {photoList?.map((photo, index) => {
                return <PhotoItem handleImge={handleImge} key={index} date={photo.createDate} imgUrl={photo.photoImageUrl} newDay={newDay[index]}/>;
            })}
        </Wrapper>
    );
}

export default PhotoList;
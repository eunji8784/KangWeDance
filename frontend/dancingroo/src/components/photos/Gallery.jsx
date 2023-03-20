import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../common/ui/Semantics";

import imge from "../../assets/images/dummy.jpg"

//임시
const Dummy = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    background-image:url(${imge});
    background-size:cover;
    filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
    border-radius: 0.2rem;
    cursor: pointer;
    margin-top: 0.5rem;
`;

function Gallery(props) {
    const [newDate, setNewDate] = useState(true);
    const [Date, setDate] = useState("");
    const {handleImge} = props;

    const checkDate = (e) => {
        if(Date !== e){
            setNewDate(true);
            setDate(e);
        } else{
            setNewDate(false);
        }
    }

    const handleClick = (imge) => {
        handleImge(imge);   
    };

    return (
        <Wrapper>
            갤러리자냐
            <Dummy onClick={()=>handleClick(imge)}/>
            {/* {photos.map((photo, index) => {
                checkDate(photo.date);
                return <Photo key={index} date={photo.date} imgUrl={photo.imageUrl} newDate={photo.newDate}/>;
            })} */}
        </Wrapper>
    );
}

export default Gallery;
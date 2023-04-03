import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { photoNum } from "../../store/photoSlice";
import styled from "styled-components";
import useApi from "../../hooks/auth/useApi";
import {TiDelete} from "react-icons/ti";
import Swal from "sweetalert2";

const Photo = styled.div`
    height: 7.2rem;
    width: 12.8rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background-image:url(${(props)=>props.imgUrl});
    background-size: 100%;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.2rem;
`;

const Back = styled.div`
    height: 1.2rem;
    width: 1.2rem;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
`;

const DateText = styled.div`
    display: flex;
    width: 12rem;
    justify-content: flex-start;
    font-size: 0.9rem;
    color: #2d2d2d;
    margin-top: 1rem;
`;

function PhotoItem({imgUrl, newDay, date, handleImge, photoIdx}) {
    const dispatch = useDispatch()
    const deletephoto = useApi()

    useEffect(() => {
        dispatch(photoNum())
    }, [deletephoto.data]);

    const deletePhoto = (photoIdx) => {
        Swal.fire({
            text: "사진을 삭제하시겠습니까?",
            width: 300,
            showCancelButton: true,
            iconColor: '#F05475 ',
            confirmButtonColor: '#F05475 ',
            confirmButtonText: "삭제",
            cancelButtonText: "취소"
        }).then(function(e){
            if(e.isConfirmed === true) {
                deletephoto.fetchApi('DELETE', `/photos/${photoIdx}`);
            }
        })
    }

    return (
        <>
            {newDay && <DateText>{date}</DateText>}
            <Photo imgUrl={imgUrl} onClick={()=>handleImge(imgUrl)}>
                <Back>
                    <TiDelete color="black" size="25" onClick={()=>deletePhoto(photoIdx)}/>
                </Back>
            </Photo>
        </>
    );
}

export default PhotoItem;
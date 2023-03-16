import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../components/common/ui/Modal";

function ModalParent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleIsModalOpen = ()=>{
        setIsModalOpen((prev)=>!prev)
    }
    const navigate = useNavigate();

    return (
        <>
            <button onClick={()=>handleIsModalOpen()}>모달 열기</button>
            <Modal handleIsModalOpen={handleIsModalOpen} isOpen={isModalOpen}/>
        </>
    );
}

export default ModalParent;

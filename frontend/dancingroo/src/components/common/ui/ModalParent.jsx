import React,{useState} from "react";
import Modal from "../components/common/ui/Modal";

function ModalParent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleIsModalOpen = ()=>{
        setIsModalOpen((prev)=>!prev)
    }

    return (
        <>
            <button onClick={()=>handleIsModalOpen()}>모달 열기</button>
            <Modal handleIsModalOpen={handleIsModalOpen} isOpen={isModalOpen}/>
        </>
    );
}

export default ModalParent;

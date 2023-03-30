import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Header, H1, Footer} from "../common/ui/Semantics";
import { ModalBtn } from "../status/HealthData";
import {ModalWrapper} from "../common/ui/Modal"

const PauseModalWrapper = styled(ModalWrapper)`
  justify-content: space-evenly;
  width: 40%;
  height: 40%;
  .continue {
    background-color: #FFD732;
    box-shadow: 0px 3px 10px rgba(240, 235, 84, 0.3);
    &:hover{
        box-shadow: 0px 3px 15px rgba(237, 240, 84, 0.6);
    }
  }
`; 

function PauseModal({handleIsModalOpen, isOpen}) {
  
  const navigate = useNavigate();
  
  return (
      <PauseModalWrapper isModalOpen={isOpen}>
          <Header>
              <H1>그만하시겠습니까?</H1>
          </Header>
          <Footer>
            <ModalBtn className="continue" onClick={()=>handleIsModalOpen()}>계속하기</ModalBtn>
            <ModalBtn onClick={()=>navigate('/play')}>그만하기</ModalBtn>
          </Footer>
      </PauseModalWrapper>
  );
}

export default PauseModal;
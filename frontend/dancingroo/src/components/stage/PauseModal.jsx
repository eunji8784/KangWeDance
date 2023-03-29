import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Header, Main, Article, Section, H1, Footer} from "../common/ui/Semantics";
import { ModalBtn } from "../status/HealthData";
import {ModalWrapper} from "../common/ui/Modal"

const PauseModalWrapper = styled(ModalWrapper)`
  justify-content: space-evenly;
  width: 35%;
  height: 40%;
  .gray {
    background-color: #FFD732;
    box-shadow: 0px 3px 10px rgba(240, 235, 84, 0.3);
    &:hover{
        box-shadow: 0px 3px 15px rgba(237, 240, 84, 0.6);
    }
  }
`; 

function PauseModal(props) {
  const {handleIsModalOpen, isOpen} = props
  const navigate = useNavigate();
  return (
      <PauseModalWrapper isModalOpen={isOpen}>
          <Header>
              <H1>그만하시겠습니까?</H1>
          </Header>
          <Footer>
            <ModalBtn className="gray" onClick={()=>handleIsModalOpen()}>계속하기</ModalBtn>
            <ModalBtn onClick={()=>navigate('/play')}>그만하기</ModalBtn>
          </Footer>
      </PauseModalWrapper>
  );
}

export default PauseModal;
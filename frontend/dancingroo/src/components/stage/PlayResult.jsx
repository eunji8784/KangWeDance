import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Wrapper, H1 } from "../common/ui/Semantics"
import UserEXP from "../common/ui/UserEXP"
import { ModalBtn } from "../status/HealthData"

const Screen = styled(Wrapper)`
  width: 100vw;
  height: 100vh;
  position: relative;
  .exit {
    position: absolute;
    right: 1rem;
    bottom: 0;
  }
  .reward {
    position: absolute;
    left: 1rem;
    bottom: 0;
  }
`
function PlayResult() {
  const navigate = useNavigate();
  return (
    <Screen>
      <H1>들썩들썩 댄스</H1>
      <H1>98점</H1>
      <UserEXP userLevel={1} startEXP={0} endEXP={400} totalLevelEXP={300} nextLevelEXP={800}></UserEXP>
      <H1 className="reward">보상 컴포넌트</H1>
      <ModalBtn className="exit" onClick={()=>navigate('/play')}>나가기</ModalBtn>
    </Screen>
  )
}

export default PlayResult

import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Wrapper, H1 } from "../common/ui/Semantics"
import UserEXP from "../common/ui/UserEXP"
import { ModalBtn } from "../status/HealthData"
import { levelDesign } from "../../utils/levelDesign"

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
function PlayResult({ data, playMode }) {
  const navigate = useNavigate()
  return (
    <Screen>
      <H1>{playMode === 0 ? "들썩들썩 댄스" : "으쌰으쌰 놀이"}</H1>
      <H1>{data?.score}점</H1>
      <UserEXP
        userLevel={data?.level}
        startEXP={data?.experienceScore - data?.score}
        endEXP={data?.experienceScore}
        totalLevelEXP={levelDesign[data?.level + 1]}
        nextLevelEXP={levelDesign[data?.level + 2]}
      ></UserEXP>
      <H1 className="reward">보상 컴포넌트</H1>
      <ModalBtn className="exit" onClick={() => navigate("/play")}>
        나가기
      </ModalBtn>
    </Screen>
  )
}

export default PlayResult

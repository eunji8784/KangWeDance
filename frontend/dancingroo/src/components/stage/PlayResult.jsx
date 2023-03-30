import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Reward from "./Reward"
import { Wrapper, H1 } from "../common/ui/Semantics"
import UserEXP from "../common/ui/UserEXP"
import { ModalBtn } from "../status/HealthData"
import useApi from "../../hooks/auth/useApi"
import { levelDesign } from "../../utils/levelDesign"

const Screen = styled(Wrapper)`
  width: 100vw;
  height: 100vh;
  position: relative;
  .score {
    font-size: 6rem;
  }
  .exit {
    position: absolute;
    right: 1rem;
    bottom: 0;
  }
`
function PlayResult({ data, playMode }) {

  const navigate = useNavigate()
  const framestickers = useApi()

  useEffect(()=>{
    framestickers.fetchApi('GET', `/photos/frames`)
  },[])

  return (
    <Screen>
      <H1>{playMode === 0 ? "들썩들썩 댄스" : "으쌰으쌰 놀이"}</H1>
      <div className='score'>{data?.score}점</div>
      <UserEXP
        userLevel={data?.level}
        startEXP={data?.experienceScoreBefore}
        endEXP={data?.experienceScoreAfter}
        totalLevelEXP={levelDesign[data?.level + 1]}
        nextLevelEXP={levelDesign[data?.level + 2]}
      />
      <Reward levelUp={data?.experienceScoreAfter >= levelDesign[data?.level + 1]} frame={framestickers.data?.data.frame}/>
      <ModalBtn className="exit" onClick={() => navigate("/play")}>
        나가기
      </ModalBtn>
    </Screen>
  )
}

export default PlayResult

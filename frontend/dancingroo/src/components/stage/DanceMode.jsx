import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
// import axios from "axios"
import Webcam from "react-webcam"
import PauseModal from "./PauseModal"
import PlayResult from "./PlayResult"
import Feedback from "./Feedback"
import { Overlay } from "../common/ui/Semantics"
import { ModalBtn } from "../status/HealthData"
import { useInterval } from "../../hooks/useInterval"
import bgImg from "../../assets/images/bgImg.png"

const tmPose = window.tmPose
const MODELURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/model.json"
const METADATAURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/metadata.json"

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .small {   // 반대로 바꿔야함
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .big {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400px;
  }
  .test {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .background-img {
    position: absolute;
    z-index: -1;
    width:100%;
    height:100%;
  }
`

const MyOverlay = styled(Overlay)`
  top: 0;
  left: 0;
  justify-content: normal;
  .exit {
    position: absolute;
    right: 1rem;
    top: 0;
  }
`

function DanceMode(props) {
  const [camfocus, setCamfocus] = useState(false)
  const [model, setModel] = useState(null)
  const [aimedPosture, setAimedPosture] = useState(null)
  const [prevPosture, setPrevPosture] = useState(-1)
  const [count, setCount] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showGreat, setShowGreat] = useState(false)
  const [showGood, setShowGood] = useState(false)
  const [showCheerUp, setShowCheerUp] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const camref = useRef(null)
  const videoref = useRef(null)
  
  const danceTimeline = 
  [
    {
      danceIndex: 2, 
      startTime: 7,
      endTime: 14,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 15,
      endTime: 23,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 23,
      endTime: 30,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 1,
      startTime: 30,
      endTime: 34,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 34,
      endTime: 42,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 42,
      endTime: 49,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 0,
      startTime: 49,
      endTime: 56,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 56,
      endTime: 63,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 3,
      startTime: 63,
      endTime: 71,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 1,
      startTime: 71,
      endTime: 79,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    },
    {
      danceIndex: 2,
      startTime: 79,
      endTime: 87,
      accuracy: 0.95,
      countDelay: 100,
      countStandard: 10,
    }
  ]

  // 처음에 모델 불러오기 + 동영상 N초 뒤에 자동 시작 (5000 = 5초)
  useEffect(() => {
    settingModel()
    const video = videoref.current
    const timeoutId = setTimeout(() => {
      video.play()
      console.log("PLAY")
    }, 5000)
    return () => clearTimeout(timeoutId)
  }, [])
  
  // 자세 변경에 따라 카운트 올리기
  useInterval(
    () => {
      setCount((count) => count + 1)
    },
    (prevPosture !== -1 && aimedPosture) ? aimedPosture?.countDelay : null
  )

  useInterval(
    () => {
      predict()
    },
    1000 / 60
  )

  // 모달 열기/닫기 함수
  const handleIsModalOpen = () => {
      setIsModalOpen((prev)=>!prev)
      if (!isModalOpen) {
        videoref.current.pause()
      } else {
        videoref.current.play()
      }
  }

  // 모델 불러오기 함수
  const settingModel = async function () {
    const model = await tmPose.load(MODELURL, METADATAURL)
    setModel(() => model)
    console.log("MODEL LOADED")
  }

  // 예측 함수 - 자세 상태(prevPosture)를 바꿈
  const predict = async function () {
    if (!model || !aimedPosture) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(
      camref.current.video
    )
    const prediction = await model.predict(posenetOutput)
    const rtPosture = prediction[aimedPosture.danceIndex]
    setPrevPosture((prevPosture) => {
      if (
        rtPosture.probability.toFixed(2) > aimedPosture.accuracy &&
        prevPosture === aimedPosture.danceIndex
      ) {
        return prevPosture
      } else if (rtPosture.probability.toFixed(2) > aimedPosture.accuracy) {
        return aimedPosture.danceIndex
      } else {
        return -1
      }
    })
  }

  // 재생 시간에 따라 노래평가시간(dancetimeline) 확인해서 목표(aimedPosture) 바꾸고
  // 카운트(count)에 따라 피드백 이미지를 띄우는 함수
  const handleTimeUpdate = () => {
    const currentTime = videoref?.current?.currentTime
    const filteredTimeline = danceTimeline.find(
      (e) =>
        e.startTime < currentTime &&
        e.endTime > currentTime
    );
    if (filteredTimeline?.startTime !== aimedPosture?.startTime) {
      setAimedPosture(filteredTimeline)
      setCount(0)
    }
    if (filteredTimeline && currentTime >= filteredTimeline.endTime-1 && currentTime < filteredTimeline.endTime) {
      if (!showGreat && !showGood && !showCheerUp) {
        if (count > filteredTimeline.countStandard) {
          setShowGreat(true)
          setTimeout(() => setShowGreat(false), 3000)
        } else if (count > filteredTimeline.countStandard / 2) {
          setShowGood(true)
          setTimeout(() => setShowGood(false), 3000)
        } else {
          setShowCheerUp(true)
          setTimeout(() => setShowCheerUp(false), 3000)
        }
      }  
    }
  }

  // 캠 위치 바꾸기 함수
  const switchVideo = () => {
    setCamfocus(!camfocus)
  }

  // test
  const replay = () => {
    videoref.current.currentTime = 90
    videoref.current.play()
  }

  //test
  const openGreatFeedback = () => {
    setShowGreat(true)
    setTimeout(() => setShowGreat(false), 3000)
  }

  //test
  const openGoodFeedback = () => {
    setShowGood(true)
    setTimeout(() => setShowGood(false), 3000)
  }

  //test
  const openCheerupFeedback = () => {
    setShowCheerUp(true)
    setTimeout(() => setShowCheerUp(false), 3000)
  }

  return (
    <Screen>
      <img className="background-img" src={bgImg} alt="background" />
      {showResult ? 
      <>
        <PlayResult/>
      </>
      :
      <>
        <Webcam
          className={camfocus ? "big" : "small"}
          ref={camref}
          mirrored={true}
        />
        <MyOverlay>
          <Feedback showGreat={showGreat} showGood={showGood} showCheerUp={showCheerUp}/>
          <ModalBtn className="exit" onClick={handleIsModalOpen}>나가기</ModalBtn>
          <div className="test">
            <ModalBtn onClick={openGreatFeedback}>Great</ModalBtn>
            <ModalBtn onClick={openGoodFeedback}>Good</ModalBtn>
            <ModalBtn onClick={openCheerupFeedback}>Cheer Up</ModalBtn>
            <ModalBtn onClick={replay}>종료 전으로 가기</ModalBtn>
            <ModalBtn onClick={switchVideo}>화면 전환</ModalBtn>
            <h1>
              평가자세 : {aimedPosture?.danceIndex || "X"}
            </h1>          
            <h1>
              현재자세 : {prevPosture}
            </h1>
            <h1>
              자세점수 : {count}
            </h1>          
          </div>
        </MyOverlay>
        <video
          className={camfocus ? "small" : "big"}
          ref={videoref}
          src="https://kangwedance.s3.ap-northeast-2.amazonaws.com/%EB%8F%99%EB%AC%BC+%ED%94%BD%EC%8A%A4.mp4"
          onTimeUpdate={handleTimeUpdate}
          onEnded={()=>setShowResult(true)}
        />
        <PauseModal handleIsModalOpen={handleIsModalOpen} isOpen={isModalOpen} />
      </>
      }
    </Screen>
  )
}

export default DanceMode
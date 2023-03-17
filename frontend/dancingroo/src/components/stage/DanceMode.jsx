import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
// import axios from "axios"
import Webcam from "react-webcam"
import PauseModal from "./PauseModal"
import { Overlay } from "../common/ui/Semantics"
import { ModalBtn } from "../status/HealthData"
import { useInterval } from "../../hooks/useInterval"

import logo from "../../assets/images/logo.png"

const tmPose = window.tmPose
const MODELURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/model.json"
const METADATAURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/metadata.json"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .small {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .big {
    position: absolute;
    bottom: 0;
    right: 0;
    width 400px;
  }
  .test {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const MyOverlay = styled(Overlay)`
  top: 0;
  left: 0;
  justify-content: normal;
  img {
    width: 30%;
    height: auto;
    display: none;
  }
  .popup {
    animation: pop-up 1s;
    @keyframes pop-up {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.4);
      }
      60% {
        transform: scale(1.1);
      }
      70% {
        transform: scale(1.2);
      }
      80% {
        transform: scale(1);
      }
      90% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`

function DanceMode(props) {
  /* eslint-disable */
  const [camfocus, setCamfocus] = useState(false)
  const [model, setModel] = useState(null)
  const [aimedPosture, setAimedPosture] = useState("나무자세")
  const [prevPosture, setPrevPosture] = useState("기본자세")
  const [count, setCount] = useState(0)
  const camref = useRef(null)
  const videoref = useRef(null)
  const imgref = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 모달 함수
  const handleIsModalOpen = ()=>{
      setIsModalOpen((prev)=>!prev)
      if (!isModalOpen) {
        videoref.current.pause()
      } else {
        videoref.current.play()
      }
  }

  // 모델 불러오기
  const settingModel = async function () {
    const model = await tmPose.load(MODELURL, METADATAURL)
    setModel(() => model)
  }

  // 처음에 모델 없으면 모델 불러오기
  useEffect(() => {
    if (model) {
      return
    }
    settingModel()
  }, [])

  // 예측 함수
  const predict = async function () {
    if (!model) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(
      camref.current.video
    )
    const prediction = await model.predict(posenetOutput)
    const rtPosture = prediction[4]
    setPrevPosture((prevPosture) => {
      if (
        rtPosture.probability.toFixed(2) > 0.95 &&
        prevPosture === aimedPosture
      ) {
        return prevPosture
      } else if (rtPosture.probability.toFixed(2) > 0.95) {
        return aimedPosture
      } else {
        return "기본자세"
      }
    })
  }

  // 자세 변경에 따라 카운트 올리기
  useInterval(
    () => {
      setCount((count) => count + 1)
    },
    prevPosture !== "기본자세" ? 1000 : null
  )

  // 프레임마다 예측 함수 반복
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (camref.current) {
        predict()
      }
    }, 1000 / 60)
    return () => clearInterval(intervalId)
  }, [model, camref.current])

  // 재생 시간에 따라 피드백 이미지를 띄우는 함수
  const handleTimeUpdate = () => {
    const img = imgref.current
    const video = videoref.current
    const currentTime = video.currentTime

    if (currentTime >= 3 && currentTime < 6) {
      img.style.display = "block"
    } else {
      img.style.display = "none"
    }
  }

  // 동영상 N초 뒤에 자동 시작 (5000 = 5초)
  useEffect(() => {
    const video = videoref.current
    const timeoutId = setTimeout(() => {
      video.play()
    }, 5000)
    return () => clearTimeout(timeoutId)
  }, [])

  const switchVideo = () => {
    setCamfocus(!camfocus)
  }

  // test
  const replay = () => {
    videoref.current.currentTime = 0
    videoref.current.play()
  }

  return (
    <Wrapper>
      <Webcam
        className={camfocus ? "big" : "small"}
        ref={camref}
        mirrored={true}
      />
      <MyOverlay>
        <img className="popup" ref={imgref} src={logo} />
        <div className="test">
          <ModalBtn onClick={handleIsModalOpen}>모달 열기</ModalBtn>
          <ModalBtn onClick={replay}>처음부터 재생</ModalBtn>
          <ModalBtn onClick={switchVideo}>화면 전환</ModalBtn>
          <h1>
            {aimedPosture} {count} {prevPosture}
          </h1>
        </div>
      </MyOverlay>
      <video
        className={camfocus ? "small" : "big"}
        ref={videoref}
        src="https://kangwedance.s3.ap-northeast-2.amazonaws.com/%EB%8F%99%EB%AC%BC+%ED%94%BD%EC%8A%A4.mp4"
        onTimeUpdate={handleTimeUpdate}
      />
      <PauseModal handleIsModalOpen={handleIsModalOpen} isOpen={isModalOpen} />
    </Wrapper>
  )
}

export default DanceMode

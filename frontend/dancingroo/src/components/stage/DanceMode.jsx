import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
// import axios from "axios"
import Webcam from "react-webcam"
import PauseModal from "./PauseModal"
import { Overlay } from "../common/ui/Semantics"
import { ModalBtn } from "../status/HealthData"
import { useInterval } from "../../hooks/useInterval"

import greatImg from "../../assets/images/great.png"
import goodImg from "../../assets/images/good.png"
import cheerupImg from "../../assets/images/cheerup.png"

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
    width: 400px;
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
    width: 25%;
    margin-top: 1rem;
    height: auto;
    display: none;
  }
  .popup {
    /* ${({active})=>active==='great' && `
      display:block;
      `} */
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
  const [aimedPosture, setAimedPosture] = useState(null)
  const [prevPosture, setPrevPosture] = useState(-1)
  const [count, setCount] = useState(0)
  const camref = useRef(null)
  const videoref = useRef(null)
  const greatimgref = useRef(null)
  const goodimgref = useRef(null)
  const cheerupimgref = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const danceTimeline = 
  [
    {
      danceIndex: 4, // 원래 2
      startTime: 7,
      endTime: 14,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 15,
      endTime: 23,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 23,
      endTime: 30,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 1,
      startTime: 30,
      endTime: 34,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 34,
      endTime: 42,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 42,
      endTime: 49,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 0,
      startTime: 49,
      endTime: 56,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 56,
      endTime: 63,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 3,
      startTime: 63,
      endTime: 71,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 1,
      startTime: 71,
      endTime: 79,
      accuracy: 0.95,
      countDelay: 100,
    },
    {
      danceIndex: 2,
      startTime: 79,
      endTime: 87,
      accuracy: 0.95,
      countDelay: 100,
    }
  ]

  // const feedbackTime = danceTimeline.map(ele=>ele.startTime)
  // let now = 0

  // 모달 함수
  const handleIsModalOpen = () => {
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

  // 자세 변경에 따라 카운트 올리기
  useInterval(
    () => {
      setCount((count) => count + 1)
    },
    prevPosture !== -1 ? aimedPosture?.countDelay : null
  )

  // 프레임마다 예측 함수 반복
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (camref.current) {
        // const currentTime = videoref?.current?.currentTime
        // if (currentTime >= feedbackTime[now]){
        //   setAimedPosture(danceTimeline[now])
        //   setCount(0)
        //   now += 1
        // }
        predict()
      }
    }, 1000 / 60)
    return () => clearInterval(intervalId)
  }, [model, camref.current, aimedPosture])

  // 재생 시간에 따라 피드백 이미지를 띄우는 함수
  const handleTimeUpdate = () => {
    const currentTime = videoref?.current?.currentTime
    const filteredTimeline = danceTimeline.filter(
      (e) =>
        e.startTime < currentTime &&
        e.endTime > currentTime
    )[0];
    setAimedPosture(filteredTimeline)
    if (currentTime >= aimedPosture?.endTime-1 && currentTime < aimedPosture?.endTime) {
      if (count > 10) {
        openGreatFeedback()
      } else if (count > 5) {
        openGoodFeedback()
      } else {
        openCheerupFeedback()
      }
    }
  }

  // // 목표 포즈 바뀌면 count 초기화
  // useEffect(() => {
  //   setCount(() => 0)
  // },[aimedPosture])

  // 동영상 N초 뒤에 자동 시작 (5000 = 5초)
  useEffect(() => {
    const video = videoref.current
    const timeoutId = setTimeout(() => {
      video.play()
    }, 5000)
    return () => clearTimeout(timeoutId)
  }, [])

  // 캠 위치 바꾸기
  const switchVideo = () => {
    setCamfocus(!camfocus)
  }

  // test
  const replay = () => {
    videoref.current.currentTime = 0
    videoref.current.play()
  }

  //test
  const openGreatFeedback = () => {
    const greatimg = greatimgref.current
    greatimg.style.display = "block"
    setTimeout(() => {greatimg.style.display = "none"}, 3000)
  }

  //test
  const openGoodFeedback = () => {
    const goodimg = goodimgref.current
    goodimg.style.display = "block"
    setTimeout(() => {goodimg.style.display = "none"}, 3000)
  }

  //test
  const openCheerupFeedback = () => {
    const cheerupimg = cheerupimgref.current
    cheerupimg.style.display = "block"
    setTimeout(() => {cheerupimg.style.display = "none"}, 3000)
  }

  return (
    <Wrapper>
      <Webcam
        className={camfocus ? "big" : "small"}
        ref={camref}
        mirrored={true}
      />
      <MyOverlay>
        <img className="popup" ref={greatimgref} src={greatImg} />
        <img className="popup" ref={goodimgref} src={goodImg} />
        <img className="popup" ref={cheerupimgref} src={cheerupImg} />
        <div className="test">
          <ModalBtn onClick={openGreatFeedback}>Great</ModalBtn>
          <ModalBtn onClick={openGoodFeedback}>Good</ModalBtn>
          <ModalBtn onClick={openCheerupFeedback}>Cheer Up</ModalBtn>
          <ModalBtn onClick={handleIsModalOpen}>모달 열기</ModalBtn>
          <ModalBtn onClick={replay}>처음부터 재생</ModalBtn>
          <ModalBtn onClick={switchVideo}>화면 전환</ModalBtn>
          <h1>
            {aimedPosture?.danceIndex || "?"} {count} {prevPosture}
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
import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
// import axios from "axios"
import Webcam from "react-webcam"
import { useInterval } from "../../hooks/useInterval"

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
  .video {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .test {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

function DanceMode(props) {
  /* eslint-disable */
  const [model, setModel] = useState(null)
  const [aimedPosture, setAimedPosture] = useState("나무자세")
  const [prevPosture, setPrevPosture] = useState("기본자세")
  const [count, setCount] = useState(0)
  // const [frameCount, setFrameCount] = useState(0)
  const videoref = useRef(null)

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
      videoref.current.video
    )
    const prediction = await model.predict(posenetOutput)
    // for (let i = 0; i < model.getTotalClasses(); i++) {
    const rtPosture = prediction[4]
    // console.log(prediction)
    console.log(rtPosture.className, rtPosture.probability.toFixed(2))
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

      // if (aimedPosture !== rtPosture.className) {
      //   return count
      // } else if (prevPosture === rtPosture.className) {
      //   return count
      // } else {
      //   setPrevPosture(() => "나무자세")
      //   return count + 1
      // }
    })
  }

  // useEffect(() => {
  //   let intervalId;
  //   if (prevPosture !== "기본자세") {
  //     intervalId = setInterval(() => {
  //       setCount((prevCount) => prevCount + 1);
  //     }, 200);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [prevPosture]);

  useInterval(
    () => {
        setCount((count) => count + 1)
    },
    prevPosture !== "기본자세" ? 350 : null
  )

  // useEffect(() => {
  //   let timeoutId
  //   if (prevPosture === "기본자세") {
  //     return
  //   }
  //   let startTime
  //   function countingInterval() {
  //     if (!startTime || Date.now() - startTime < 200) {
  //       setCount((count) => count + 1)
  //       startTime = Date.now()
  //     }
  //   }
  //   countingInterval()
  // }, [prevPosture])

  // 프레임마다 반복
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (videoref.current) {
        predict()
      }
    }, 1000 / 60)
    return () => clearInterval(intervalId)
  }, [model, videoref.current])

  return (
    <Wrapper>
      <div className="videobox">
        <Webcam className="video" ref={videoref} mirrored={true} />
        <div className="test">
          <h1>
            {aimedPosture} {count} {prevPosture}
          </h1>
        </div>
      </div>
    </Wrapper>
  )
}

export default DanceMode

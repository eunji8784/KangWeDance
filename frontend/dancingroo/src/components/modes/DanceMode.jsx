import React, { useRef, useEffect, useState } from "react"
// import styled from "styled-components"
// import axios from "axios"
import Webcam from "react-webcam"

const tmPose = window.tmPose
const modelURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/model.json"
const metadataURL =
  "https://teachablemachine.withgoogle.com/models/7g9Z9_ogC/metadata.json"
let frameIDs = []
function DanceMode(props) {
  /* eslint-disable */
  const [model, setModel] = useState(null)
  const [webcam, setWebcam] = useState(null)
  const [nowPosture, setNowPosture] = useState(null)
  const [badCnt, setBadCnt] = useState(0)
  const videoref = useRef(null)
  useEffect(
    function () {
      if (videoref?.current) {
        settingModel()
        sizeSet()
      }
    },
    [videoref.current]
  )

  const settingModel = async function () {
    const model = await tmPose.load(modelURL, metadataURL)
    setModel(() => model)
  }

  const sizeSet = async function () {
    let w = null
    let h = null

    if (videoref.current) {
      w = videoref.current.offsetWidth
      h = videoref.current.offsetHeight
    }
    const webcam = await new tmPose.Webcam(w || 300, h || 200, true)
    setWebcam(() => webcam)
  }

  const loop = async function () {
    if (videoref.current && webcam) {
      sizeSet()
      console.log("!!!")
      predict()
    }
  }

  useEffect(() => {
    settingModel()
    sizeSet()
  }, [])

  useEffect(() => {
    function handleResize() {
      sizeSet()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const predict = async function () {
    if (!model) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(videoref.current.video)
    const prediction = await model.predict(posenetOutput)
    for (let i = 0; i < model.getTotalClasses(); i++) {
      const rtPosture = prediction[i]
      if (rtPosture.probability.toFixed(2) > 0.99) {
        setBadCnt((val) => {
          if (nowPosture === rtPosture.className) {
            return val + 1
          } else {
            return 0
          }
        })
        setNowPosture((oldPosture) => rtPosture.className)
        console.log(`자세 : ${nowPosture}, 몇프레임째(600당 10초) : ${badCnt}`)
      }
    }
  }

  useEffect(
    function () {
      setTimeout(function () {
        if (videoref?.current) {
          const aniId = window.requestAnimationFrame(loop)
          frameIDs.push(aniId)
        }
      }, 1000)

      return function () {
        let frameID
        if (frameIDs.length > 0) {
          frameID = frameIDs.shift()
          window.cancelAnimationFrame(frameID)
        }
      }
    },
    [videoref.current, webcam, predict]
  )

  return (
    <>
      <div className="videobox">
        <Webcam ref={videoref} />
      </div>
      <div>
        <h1>
          {nowPosture} {badCnt}
        </h1>
      </div>
    </>
  )
}

export default DanceMode

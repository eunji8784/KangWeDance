import React, { useState, useEffect, useRef } from "react"
import { OpenVidu } from "openvidu-browser"
import axios from "axios"
import UserVideoComponent from "./UserVideoComponent"
import "./Video.css"

const OPENVIDU_SERVER_URL = "http://localhost:5000/"

export default function Video() {
  const [mySessionId, setMySessionId] = useState(`${Date.now()}`)
  const [session, setSession] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  /* eslint-disable */
  const [OV, setOV] = useState()
  const videoRef = useRef(null)

  // 최초 진입 시 세션 접속
  useEffect(() => {
    joinSession()
  }, [])

  // 페이지 변동에 따른 세션 종료
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     leaveSession()
  //   }
  //   window.addEventListener("beforeunload", handleBeforeUnload)
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload)
  //     leaveSession()
  //     // cancelAnimationFrame(props.videoRef.current)
  //   }
  // }, [session])

  // useEffect(
  //   function () {
  //     if (props.videoRef.current && session) {
  //       settingModel()
  //       sizeSet()
  //     }
  //   },
  //   [props.videoRef.current, session]
  // )

  // const prevNowPosture = useRef("normal")

  // useEffect(() => {
  //   if (postureAlarm && progress) {
  //     const interval = setInterval(() => {
  //       if (nowPosture !== "normal") {
  //         prevNowPosture.current = nowPosture
  //         audioRef.current.src = pinThree
  //         audioRef.current.play()
  //         callNotification("자세 알람", "바른 자세를 유지해봅시다!")
  //       }
  //     }, 8000)
  //     return function () {
  //       clearInterval(interval)
  //     }
  //   }
  // }, [nowPosture, postureAlarm])

  // useEffect(() => {
  //   let timeoutId
  //   let startTime = Date.now()

  //   function stretchingInterval() {
  //     if (progress && stretchingAlarm) {
  //       if (Date.now() - startTime >= stretchingAlarmDelay * 60 * 1000) {
  //         audioRef.current.src = buttonAlarm
  //         audioRef.current.play()
  //         callNotification("스트레칭 알람", "스트레칭할 시간이에요!")
  //         startTime = Date.now()
  //       }
  //       timeoutId = setTimeout(stretchingInterval, 1000)
  //     }
  //   }
  //   stretchingInterval()
  //   return function () {
  //     clearTimeout(timeoutId)
  //   }
  // }, [progress, stretchingAlarmDelay, stretchingAlarm])

  // const settingModel = async function () {
  //   const a = await tmPose.load(modelURL, metadataURL)
  //   setModel(() => a)
  // }

  // const sizeSet = async function () {
  //   let w = null
  //   let h = null
  //   if (props.videoRef.current) {
  //     w = props.videoRef.current.offsetWidth
  //     h = props.videoRef.current.offsetHeight
  //   }
  //   const wc = await new tmPose.Webcam(w || 300, h || 200, true)
  //   setWebcam(() => wc)
  // }

  // const loop = async function (timestamp) {
  //   if (props.videoRef.current && webcam) {
  //     sizeSet()
  //     predict()
  //   }
  // }

  // useEffect(() => {
  //   settingModel()
  //   sizeSet()
  // }, [])

  // useEffect(() => {
  //   function handleResize() {
  //     sizeSet()
  //   }
  //   window.addEventListener("resize", handleResize)
  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  // const predict = async function () {
  //   if (!model) {
  //     return
  //   }
  //   const { pose, posenetOutput } = await model.estimatePose(
  //     props.videoRef.current
  //   ) // posenetOutput : 좌표에 관한 내용이 들어가 있음.
  //   const prediction = await model.predict(posenetOutput)
  //   for (let i = 0; i < 4; i++) {
  //     const rtPosture = prediction[i]
  //     if (rtPosture.probability.toFixed(2) > 0.9999) {
  //       // nowPosture, setNowPosture, posture, setPosture, badCnt, setBadCnt
  //       // if nowposture가 rtPosture.class와 같다면
  //       // posture를 덮어서 갱신.
  //       setBadCnt((val) => {
  //         if (nowPosture === rtPosture.className) {
  //           return val + 1
  //         } else {
  //           return 0
  //         }
  //       })
  //       setNowPosture((oldPosture) => rtPosture.className)
  //     }
  //   }
  // }

  // useEffect(
  //   function () {
  //     setTimeout(function () {
  //       if (props.videoRef.current) {
  //         const aniId = window.requestAnimationFrame(loop)
  //         frameIDs.push(aniId)
  //       }
  //     }, 1000)

  //     return function () {
  //       let frameID
  //       if (frameIDs.length > 0) {
  //         frameID = frameIDs.shift()
  //         window.cancelAnimationFrame(frameID)
  //       }
  //     }
  //   },
  //   [props.videoRef.current, webcam, predict]
  // )

  // useEffect(
  //   function () {
  //     if (nowPosture !== "normal" && nowPosture !== "left" && badCnt > 6000) {
  //       setBadCnt(() => 0)
  //       // 액시오스 요청
  //       const requestPosture = nowPosture
  //       axios({
  //         method: "post",
  //         url: "/v1/posture/save",
  //         data: {
  //           className: requestPosture,
  //         },
  //       })
  //     } else if (nowPosture === "left" && badCnt > 54000) {
  //       // 액시오스 요청
  //       axios({
  //         method: "post",
  //         url: "/v1/posture/save",
  //         data: {
  //           className: "left",
  //         },
  //       })
  //     }
  //     return function () {
  //       const source = axios.CancelToken.source()
  //       source.cancel("cancelling in cleanup")
  //     }
  //   },
  //   [badCnt, nowPosture]
  // )

  // 토큰 반환
  const getToken = async () => {
    const sessionId = await createSession(mySessionId)
    return await createToken(sessionId)
  }

  // 세션에 참여하는 함수
  const joinSession = () => {
    const newOV = new OpenVidu()
    newOV.enableProdMode()
    const mySession = newOV.initSession()
    setOV(newOV)
    setSession(mySession)
    const connection = () => {
      // subscribers 관련 내용 삭제

      // 토큰 가져오기 (수정 예정)
      getToken().then((token) => {
        mySession
          // .connect(token, { clientData: `${user.nickname}` })
          .connect(token, { clientData: `${"default"}` })
          .then(async () => {
            // 화면 가져오기
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: undefined,
                frameRate: 30,
              })
              .then((mediaStream) => {
                // let newPublisher = newOV.initPublisher(`${user.nickname}`, {
                let newPublisher = newOV.initPublisher(`${"default"}`, {
                  audioSource: undefined,
                  publishAudio: false,
                  publishVideo: true,
                  mirror: true,
                  insertMode: "APPEND",
                })
                newPublisher.once("accessAllowed", () => {
                  mySession.publish(newPublisher)
                  setPublisher(newPublisher)
                })
              })
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            )
          })
      })
    }
    connection()
  }

  const leaveSession = () => {
    // session에 따른 useEffect -> 세션이 남아있는 경우에만 실행되도록
    if (!session) return
    session?.disconnect()
    // 데이터 비우기
    setOV(null)
    setSession(undefined)
    setMySessionId("Session")
    setPublisher(undefined)
  }

  // const reJoinSession = () => {
  //   setMySessionId(`${Date.now()}`)
  //   leaveSession()
  //     .then(() => {
  //       joinSession()
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  const createSession = async (sessionId) => {
    const response = await axios.post(
      // OPENVIDU_SERVER_URL + "openvidu/api/sessions",
      OPENVIDU_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          // Authorization: `Basic ${btoa(
          //   `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          // )}`,
          "Content-Type": "application/json",
        },
      }
    )
    // return response.data.sessionId // The sessionId
    return response.data
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(
      OPENVIDU_SERVER_URL +
        "api/sessions/" +
        // "openvidu/api/sessions/" +
        sessionId +
        // "/connection",
        "/connections",
      {},
      {
        headers: {
          // Authorization: `Basic ${btoa(
          //   `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          // )}`,
          "Content-Type": "application/json",
        },
      }
    )
    // return response.data.token // The token
    // console.log(response.data)
    return response.data
  }
  console.log(publisher)
  return (
    <>
      <div className="videobox">
        {publisher && (
          <UserVideoComponent streamManager={publisher} videoRef={videoRef} />
        )}
      </div>
    </>
  )
}

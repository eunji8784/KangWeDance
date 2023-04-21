import React, { useRef, useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import styled from "styled-components"
import axios from "axios";
import Webcam from "react-webcam"
import DirectionModal from "./DirectionModal"
import PauseModal from "./PauseModal"
import PlayResult from "./PlayResult"
import Feedback from "./Feedback"
import { Overlay } from "../common/ui/Semantics"
import { ModalBtn } from "../status/HealthData"
import { useInterval } from "../../hooks/useInterval"
import useApi from "../../hooks/auth/useApi"
import game_bg from "../../assets/images/game_bg.png"
import result_bg from "../../assets/images/result_bg.png"
import { AiFillSetting, AiFillCamera } from "react-icons/ai";
import { HiSwitchHorizontal } from "react-icons/hi"
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2"
import { RxExit } from "react-icons/rx";

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
  .big {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .small {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 400px;
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
  .button {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: -0.5rem;
    top: 1.5rem;
    transform: translateY(-70%);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .button.show {
    transform: translateY(20%);
    opacity: 1;
    z-index: 2;
  }
`

const MyBtn = styled(ModalBtn)`
  justify-content: space-evenly;
  margin: 0.5rem 1rem;
`

const Settings = styled(AiFillSetting)`
  width:3rem;
  height:3rem;
  position:absolute;
  top:2.5%;
  right:3%;
  z-index:1;
  cursor:pointer;
`

function Timemode() {
  /* eslint-disable */
  const navigate = useNavigate()

  const stageItem = useSelector((state) => state.stage.stageItem)
  const userId = useSelector((state) => state.userState.userId)
  const children = useSelector((state) => state.userState.children)
  const select = useSelector((state) => state.userState.select)

  const [camfocus, setCamfocus] = useState(false)
  const [model, setModel] = useState(null)
  const [aimedPosture, setAimedPosture] = useState(null)
  const [prevPosture, setPrevPosture] = useState(10)
  // const [timeCount, setTimeCount] = useState(0)
  const [count, setCount] = useState(0)
  const [scoreRecordList, setScoreRecordList] = useState([])
  const [autoScreenshot, setAutoScreenshot] = useState(false)
  const [showGreat, setShowGreat] = useState(false)
  const [showGood, setShowGood] = useState(false)
  const [showCheerUp, setShowCheerUp] = useState(false)
  const [showReadyGo, setShowReadyGo] = useState(false)
  const [isDirectionModalOpen, setIsDirectionModalOpen] = useState(false)
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false)
  const camref = useRef(null)
  const videoref = useRef(null)

  const [afterDirection, setAfterDirection] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [playTime, setPlayTime] = useState(null)

  const playTimeline = stageItem.songMotionList

  const playRecord = useApi()
  const postPhoto = useApi()

  useEffect(()=>{
    if (stageItem==='init'){
      navigate('/play')
    }
  }, [stageItem])

  // 처음에 모델 불러오기
  useEffect(() => {
    settingModel()
  }, [])
  
  // 자세 변경에 따라 카운트 올리기
  useInterval(
    () => {
      if (!isPauseModalOpen) {
        setCount((count) => count + 1)
      }
    },
    (prevPosture !== 10 && aimedPosture) ? aimedPosture?.countDelay : null
  )
  
  // 60fps로 predict 함수 돌리기
  useInterval(
    () => {
      predict()
    },
    1000 / 60
  )

  // 모델 불러오기 함수
  const settingModel = async function () {
    const model = await tmPose.load(MODELURL, METADATAURL)
    setModel(() => model)

  }

  // 모달 열기/닫기 함수 -> time 따로 만들어서 저장후 다시 돌리기
  const handleIsPauseModalOpen = () => {
    if (!afterDirection) {
      if (!isPauseModalOpen) {
        videoref.current.pause()
      } else {
        videoref.current.play()
      }
    }
    setIsPauseModalOpen((prev)=>!prev)
  }

  // 예측 함수 - 캠에 따라 자세 상태(prevPosture)를 바꿈
  const predict = async function () {
    if (!model || !aimedPosture || isPauseModalOpen) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(
      camref.current.video
    )
    const prediction = await model.predict(posenetOutput)
    const rtPosture = prediction[aimedPosture.danceIndex-1]
    setPrevPosture((prevPosture) => {
      if (
        rtPosture.probability.toFixed(2) > aimedPosture.accuracy &&
        prevPosture === aimedPosture.danceIndex-1
      ) {
        return prevPosture
      } else if (rtPosture.probability.toFixed(2) > aimedPosture.accuracy) {
        return aimedPosture.danceIndex-1
      } else {
        return 10
      }
    })
  }

  // 캠 위치 바꾸기 함수
  const switchVideo = () => {
    setCamfocus(!camfocus)
  }

  const captureScreenshot = useCallback( async () => {
    const screenshot = camref.current.getScreenshot()
    var arr = screenshot.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], "file", {type:mime});
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post("https://kangwedance.site/dev/children/profile", formData);
      if (response.data.success) {
        const body = {
          photoImageUrl:response.data.data,
          photoName:`${userId}-${children[select].childIdx}`
        }
        postPhoto.fetchApi('POST', '/photos', body)
      }
    } catch (error) {
        console.error(error);
    }
  },[camref])

  const handleAfterDirection = () => {
    setAfterDirection(true)
    setCamfocus(true)
    setIsDirectionModalOpen(true)
  }

  const handleIsDirectionModalOpen = () => {
    setIsDirectionModalOpen(false)
    setShowReadyGo(true)
    setTimeout(() => setShowReadyGo(false), 3750)
    setTimeout(() => setGameStart(true), 3750)
  }

  useInterval(
    () => {
      if (gameStart && !isPauseModalOpen) {
        setPlayTime((prev)=> prev + 14)
        const filteredTimeline = playTimeline.find(
          (e) =>
            e.startTime * 1000 < playTime &&
            e.endTime * 1000 > playTime
        );
        if (filteredTimeline?.startTime !== aimedPosture?.startTime) {
          if (aimedPosture) {
            let scoreRecord = {}
            scoreRecord.danceIndex = aimedPosture.danceIndex
            scoreRecord.count = count
            scoreRecord.time = aimedPosture.endTime - aimedPosture.startTime
            scoreRecord.countStandard = aimedPosture.countStandard
            setScoreRecordList([...scoreRecordList, scoreRecord])
          }
          setAimedPosture(filteredTimeline)
          setCount(0)
        }
        if (filteredTimeline && playTime >= filteredTimeline.endTime * 1000 - 1000  && playTime < filteredTimeline.endTime * 1000) {
          if (!showGreat && !showGood && !showCheerUp) {
            if (count > filteredTimeline.countStandard) {
              setShowGreat(true)
              setTimeout(() => setShowGreat(false), 2000)
            } else if (count > filteredTimeline.countStandard / 2) {
              setShowGood(true)
              setTimeout(() => setShowGood(false), 2000)
            } else {
              setShowCheerUp(true)
              setTimeout(() => setShowCheerUp(false), 2000)
            }
          }  
        }
      }
      if (playTime && playTime > playTimeline[playTimeline.length-1]?.endTime * 1000) {
        setGameStart(false)
      }
    },
    10
  )

  useEffect(() => {
    if (scoreRecordList.length === playTimeline?.length-1  && autoScreenshot) {
      captureScreenshot()
    }
    if (scoreRecordList.length === playTimeline?.length) {
      const playData = {
        childIdx: children[select].childIdx,
        songIdx: stageItem.songIdx,
        playMode: stageItem.playMode,
        scoreRecordList: scoreRecordList,
      }
      playRecord.fetchApi('POST', '/play', playData)
    }
  },[scoreRecordList])

  // test
  // useInterval(
  //   () => {
  //     if (!isPauseModalOpen) {
  //       setTimeCount((time) => time + 1)
  //     }
  //   },
  //   (prevPosture !== 10 && aimedPosture) ? 10 : null
  // )

  const toggleAutoScreenshot = () => {
    setAutoScreenshot((prev) => !prev)
  }

  const [isBtnOpen, setIsBtnOpen] = useState(false);
  
  const toggleButton = (trigger) => {
    if (trigger==="enter"){
      setIsBtnOpen(true);
    } else {
      setIsBtnOpen(false)
    }
  };

  return (
    <Screen>
      {!playRecord.isLoading ? 
      <>
        <img className="background-img" src={result_bg} alt="background" />
        <PlayResult data={playRecord.data.data} playMode={stageItem.playMode}/>
      </>
      :
      <>
        <img className="background-img" src={game_bg} alt="background" />
        <Webcam
          className={camfocus ? "big" : "small"}
          ref={camref}
          mirrored={true}
          screenshotFormat="image/jpeg"
        />
        <MyOverlay>
          <Feedback showGreat={showGreat} showGood={showGood} showCheerUp={showCheerUp} showReadyGo={showReadyGo}/>
          {isBtnOpen &&       
          <div open={isBtnOpen} className={isBtnOpen ? 'show button' : 'button'}>
            <MyBtn onClick={toggleAutoScreenshot} style={{fontSize:"0.7rem"}}>
              {autoScreenshot? 
                <>
                  <HiVideoCamera style={{fontSize:"1.5rem"}}/>자동캡쳐 켜짐
                </>
                :
                <>
                  <HiVideoCameraSlash style={{fontSize:"1.5rem"}}/>자동캡쳐 꺼짐
                </>
              }
            </MyBtn>
            <MyBtn onClick={captureScreenshot}><AiFillCamera style={{fontSize:"1.5rem"}}/>사진 캡쳐</MyBtn>
            {!afterDirection && <MyBtn onClick={switchVideo}><HiSwitchHorizontal style={{fontSize:"1.5rem"}}/>화면 전환</MyBtn>}
            <MyBtn onClick={handleIsPauseModalOpen}><RxExit style={{fontSize:"1.5rem"}}/>그만하기</MyBtn>
          </div>
          }
        </MyOverlay>
        {!afterDirection && 
        <video
          className={camfocus ? "small" : "big"}
          ref={videoref}
          src={stageItem.videoUrl !== 'url' ? stageItem.videoUrl : `https://d3qb4vbeyp8phu.cloudfront.net/%EB%8F%99%EB%AC%BC.MOV`} // 빼기
          onCanPlayThrough={()=>videoref.current.play()}
          onEnded={handleAfterDirection}
        />}
        <PauseModal handleIsModalOpen={handleIsPauseModalOpen} isOpen={isPauseModalOpen} />
        <DirectionModal handleIsModalOpen={handleIsDirectionModalOpen} isOpen={isDirectionModalOpen} directionMessage={stageItem?.explain}/>
        <Settings onMouseEnter={()=>toggleButton('enter')} onClick={()=>toggleButton('click')} color={isBtnOpen? '#F05475' : 'black'} />
      </>
      }
    </Screen>
  )
}

export default Timemode
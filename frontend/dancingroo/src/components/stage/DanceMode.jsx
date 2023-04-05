import React, { useRef, useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import axios from "axios";
import Webcam from "react-webcam"
import PauseModal from "./PauseModal"
import PlayResult from "./PlayResult"
import Feedback from "./Feedback"
import ProgressBar from "./ProgressBar";
import { Overlay } from "../common/ui/Semantics"
import { ModalBtn } from "../status/HealthData"
import { useInterval } from "../../hooks/useInterval"
import useApi from "../../hooks/auth/useApi"
import dance_bg from "../../assets/images/dance_bg.png"
import { AiFillCamera } from "react-icons/ai";
import { HiSwitchHorizontal } from "react-icons/hi"
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2"
import {MdKeyboardDoubleArrowRight} from "react-icons/md"
import { RxExit } from "react-icons/rx";
import {TbSettingsFilled} from "react-icons/tb";
import { poseTable } from "../../utils/commonInfo";
import { PoseImages } from "./PoseImages";

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
  .button {
    display:flex;
    flex-direction: column;
    position: absolute;
    right: -0.5rem;
    top: 1.5rem;
    transform: translateY(-50%);
    transition: all 0.5s ease;
  }
  .button.show {
    transform: translateY(20%);
    opacity: 1;
  }
`

const MyBtn = styled(ModalBtn)`
  justify-content: space-evenly;
  margin: 0.5rem 1rem;
`

const DirectionDiv = styled.div`
  width:15rem;
  height:6rem;
  background-color: #c9f7f9;
  position:absolute;
  top:0;
  left:8rem;
  z-index:2;
  font-size:2rem;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  .arrow{
    margin-top:0.7rem;
    height:5rem;
  }
  div{
    width:40%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    position:relative;
    h5{
      font-size:1rem;
    }
  }
`
const FocusOffDirectionDiv = styled.div`
  width:15rem;
  height:6rem;
  position:absolute;
  bottom:0;
  left:18rem;
  z-index:2;
  font-size:2rem;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  .arrow{
    height:5rem;
    margin-top:0.7rem;
  }
  .pose-images{
    width:10rem;
    height:5rem;
  }
  div{
    width:40%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    position:relative;
    h5{
      position:absolute;
      top:-1.3rem;
      font-size:1rem;
    }
  }
`

const Settings = styled(TbSettingsFilled)`
  width:3rem;
  height:3rem;
  position:absolute;
  top:2.5%;
  right:3%;
  z-index:1;
  cursor:pointer;
`

function DanceMode() {
  /* eslint-disable */
  const stageItem = useSelector((state) => state.stage.stageItem)
  const userId = useSelector((state) => state.userState.userId)
  const children = useSelector((state) => state.userState.children)
  const select = useSelector((state) => state.userState.select)

  const [camfocus, setCamfocus] = useState(false)
  const [model, setModel] = useState(null)
  const [aimedPosture, setAimedPosture] = useState(null)
  const [prevPosture, setPrevPosture] = useState(10)
  const [count, setCount] = useState(0)
  const [scoreRecordList, setScoreRecordList] = useState([])
  const [autoScreenshot, setAutoScreenshot] = useState(false)
  const [showGreat, setShowGreat] = useState(false)
  const [showGood, setShowGood] = useState(false)
  const [showCheerUp, setShowCheerUp] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBtnOpen, setIsBtnOpen] = useState(false);
  const [arrowState, setArrowState] = useState(false)

  useInterval(
    () => {
      setArrowState(!arrowState)
    },
    500
  )

  const toggleButton = (trigger) => {
    if (trigger==="enter"){
      setIsBtnOpen(true);
    } else {
      setIsBtnOpen(false)
    }
    
  };

  const camref = useRef(null)
  const videoref = useRef(null)
  
  const danceTimeline = stageItem.songMotionList
  const playRecord = useApi()
  const postPhoto = useApi()

  // 처음에 모델 불러오기
  useEffect(() => {
    settingModel()
  }, [])
  
  // 자세 변경에 따라 카운트 올리기
  useInterval(
    () => {
      if (!isModalOpen) {
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
  
// 30초에 한번 스크린샷 찍기
  useInterval(
    () => {
      if (!isModalOpen && autoScreenshot) {
        captureScreenshot()
      }
    },
    1000 * 30
  )

  // 모달 열기/닫기 함수
  const handleIsModalOpen = () => {
    if (!isModalOpen) {
      videoref.current.pause()
    } else {
      videoref.current.play()
    }
    setIsModalOpen((prev)=>!prev)
  }

  // 모델 불러오기 함수
  const settingModel = async function () {
    const model = await tmPose.load(MODELURL, METADATAURL)
    setModel(() => model)
    console.log("MODEL LOADED")
  }

  // 예측 함수 - 캠에 따라 자세 상태(prevPosture)를 바꿈
  const predict = async function () {
    if (!model || !aimedPosture || isModalOpen) {
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
    if (filteredTimeline && currentTime >= filteredTimeline.endTime-1 && currentTime < filteredTimeline.endTime) {
      if (!showGreat && !showGood && !showCheerUp) {
        if (count >= filteredTimeline.countStandard) {
          setShowGreat(true)
          setTimeout(() => setShowGreat(false), 3000)
        } else if (count >= filteredTimeline.countStandard / 2) {
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

  useEffect(() => {
    if (scoreRecordList.length === danceTimeline?.length) {
      const playData = {
        childIdx: children[select].childIdx,
        songIdx: stageItem.songIdx,
        playMode: stageItem.playMode,
        scoreRecordList: scoreRecordList,
      }
      playRecord.fetchApi('POST', '/play', playData)
    }
  },[scoreRecordList])

  const toggleAutoScreenshot = () => {
    setAutoScreenshot((prev) => !prev)
  }
  console.log(isBtnOpen)
  return (
    <Screen>
      <img className="background-img" src={dance_bg} alt="background" />
      {!playRecord.isLoading ? 
      <>
        <PlayResult data={playRecord.data.data} playMode={stageItem.playMode}/>
      </>
      :
      <>
        <Webcam
          className={camfocus ? "big" : "small"}
          ref={camref}
          mirrored={true}
          screenshotFormat="image/jpeg"
        />
        <MyOverlay>
          <Feedback showGreat={showGreat} showGood={showGood} showCheerUp={showCheerUp}/>
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
            <MyBtn onClick={switchVideo}><HiSwitchHorizontal style={{fontSize:"1.5rem"}}/>화면 전환</MyBtn>
            <MyBtn onClick={handleIsModalOpen}><RxExit style={{fontSize:"1.5rem"}}/>그만하기</MyBtn>
          </div>
          }
          <ProgressBar nowProgress={videoref?.current?.currentTime} endProgress={videoref?.current?.duration}/>
          {!camfocus?
            <DirectionDiv onClick={()=>videoref.current.pause()}
            >
              <div className="arrow">
                {arrowState?
                <MdKeyboardDoubleArrowRight color="yellow" size={90}/>
                :
                <MdKeyboardDoubleArrowRight color="white" size={90}/>
                }
              </div>
              <div className="pose-images">
                  {PoseImages(poseTable[aimedPosture?.danceIndex])}
              </div>
            </DirectionDiv>
          :
            <FocusOffDirectionDiv>
              <div className="arrow">
                {arrowState?
                <MdKeyboardDoubleArrowRight color="yellow" size={90}/>
                :
                <MdKeyboardDoubleArrowRight color="white" size={90}/>
                }
              </div>
              <div>
                  {PoseImages(poseTable[aimedPosture?.danceIndex])}
              </div>
            </FocusOffDirectionDiv>
          }
        </MyOverlay>
        <video
          className={camfocus ? "small" : "big"}
          ref={videoref}
          src={stageItem.videoUrl}
          onCanPlayThrough={()=>videoref.current.play()}
          onTimeUpdate={handleTimeUpdate}
        />
        <PauseModal handleIsModalOpen={handleIsModalOpen} isOpen={isModalOpen} />
        <Settings onMouseEnter={()=>toggleButton('enter')} onClick={()=>toggleButton('click')} color={isBtnOpen? '#3050d1' : 'black'}
        />
      </>
      }
    </Screen>
  )
}

export default DanceMode
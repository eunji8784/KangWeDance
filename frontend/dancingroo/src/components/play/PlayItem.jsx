import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import useSound from "use-sound";
import HoverVideoPlayer from 'react-hover-video-player';
import { setStageItem } from "../../store/stageSlice";
import { Wrapper, PinkButton } from "../common/ui/Semantics";
import recommendationPng from "../../assets/images/Recommendation.png"
import { TbStarFilled } from "react-icons/tb";
import { GoMute, GoUnmute } from "react-icons/go";

const ItemWrapper = styled(Wrapper)`
  position: relative;
  min-width: 100%;
  height: 100%;
  justify-content: normal;
`;

const ThumbnailWrapper = styled(Wrapper)`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  &:hover {
      transform: scale(1.05);
    }
  .thumbnail {
    width: 100%;
    border-radius: 12px;
  }
  .preview {
    font-size: 1.5rem;
    position: absolute;
    top: 5%;
    right: 5%;
    border-radius: 0.5rem;
    width: 2rem;
    height: 2rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    :hover {
      transform: scale(1.1);
    }
  }
`

const InfoWrapper = styled(Wrapper)`
  width: 100%;
  flex-direction: row;
  margin: 0.8rem 1rem;
  margin-bottom: 1.5rem;
  .stars {
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

const TagWrapper = styled(Wrapper)`
  width: 100%;
  flex-direction: row;
  justify-content: normal;
`;

const Star = styled(TbStarFilled)`
  color: #FFD731 ;
  font-size: 1.6rem;
  @-webkit-keyframes rotateY {
  to { -webkit-transform: rotateY(360deg); }
  }
  @keyframes rotateY {
  to { transform: rotateY(360deg); }
}
`;

const StarWrapper = styled.div`
  display: inline-block;
  :hover ${Star} {
    -webkit-animation: rotateY 2s infinite linear;
    animation: rotateY 2s infinite linear;
  }
`;

const Tag = styled(PinkButton)`
  border-radius: 18px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: default;
  margin-right: 0;
  background-color: #ffa6a6;
`;

const TextInfo = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color:#333333;
`;

const RecommandedOverlay = styled.div`
  position: absolute;
  top: -1.5rem;
  left: -1.5rem;
  width: 6rem;
  height: 6rem;
  background-image:url(${recommendationPng});
  background-size:cover;
  z-index: 2;
  transform: rotateZ(-20deg);
  transition: all 0.5s ease-in-out;
  :hover {
    transform: rotateZ(-20deg) scale(1.1);
  }
`

function PlayItem({item, tags}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selected = useSelector(state=>state.userState.select)
  const recommendation = useSelector(state=>state.stage.recommendation)
  const [previewPlay, setPreviewPlay] = useState(false);
  const [ play, { stop, sound }] = useSound(item?.previewMusicUrl, { format: 'mp3' })

  const Preview = () => {
    return (
      item?.playMode === 0 && 
      <div className="preview" onClick={togglePreview}>
        { !previewPlay ? <GoMute /> : <GoUnmute /> }
      </div>
    )
  }

  const Stars = () => {
    return (
      <div className="stars">
        {Array(item.difficulty).fill(null).map((_, idx) => <StarWrapper><Star key={idx} /></StarWrapper>)}
      </div>
    )
  }

  const Tags = () => {
    const tags = item?.tag?.split('#').filter(tag => tag);
    return tags.map(tag => <Tag key={tag}> { `${tag}` } </Tag>)
  }

  const Recommendation = () => {
    const check = recommendation && recommendation[selected]?.recommendationSong?.songIdx === item?.songIdx
    return check && <RecommandedOverlay />
  }

  useEffect(() => {
    if (previewPlay) {
      play()
      sound?.fade(0, 1, 2000)
    } else {
      stop()
    }
  },[previewPlay])
  
  const startStage = (event) => {
    if (event.target.closest('.preview')) {
      event.preventDefault();
      return;
    }
    dispatch(setStageItem(item))
    navigate(`/play/${item.playMode}/${item.songIdx}`)
  }

  const togglePreview = () => {
    setPreviewPlay(prev => !prev);
  }
  
  const stopPreview = () => {
    if (previewPlay) {
      setPreviewPlay(false)
    }
  }

  return (
    <ItemWrapper >
      <Recommendation />
      <ThumbnailWrapper onClick={startStage} onMouseLeave={stopPreview}>
        <HoverVideoPlayer
          videoClassName="thumbnail"
          videoSrc={item?.videoUrl}
          pausedOverlay={
            <img className="thumbnail"
              src={item.thumbnailUrl}
              alt="thumbnail"
            />
          }
          overlayTransitionDuration={1500}
          onHoverEnd={() => { stop() }}
          sizingMode="overlay"
          restartOnPaused={true}
          hoverOverlay={<Preview/>}
        />
      </ThumbnailWrapper>
      <InfoWrapper>
        { tags ?
          <TagWrapper>
            <Tags />
          </TagWrapper>
          :
          <TextInfo>
            {item?.title}
          </TextInfo>
        }
        <Stars />
      </InfoWrapper>
    </ItemWrapper>
  );
}

export default PlayItem;

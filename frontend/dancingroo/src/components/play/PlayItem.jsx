import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useSound from "use-sound";
import HoverVideoPlayer from 'react-hover-video-player';
import { setStageItem } from "../../store/stageSlice";
import { Wrapper, H2, PinkButton } from "../common/ui/Semantics";
import { TbStarFilled } from "react-icons/tb";
import { GoMute, GoUnmute } from "react-icons/go";

const ItemWrapper = styled(Wrapper)`
  width: 100%;
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
    z-index: 1;
  }
`

const InfoWrapper = styled(Wrapper)`
  width: 100%;
  flex-direction: row;
  margin-left: 5%;
  .stars {
    margin-left: auto;
    margin-right: 5%;
  }
`;

const TagWrapper = styled(Wrapper)`
  width: 100%;
  flex-direction: row;
`;

const Star = styled(TbStarFilled)`
  color: #FFD732;
  font-size: 2rem;
`;

const Tag = styled(PinkButton)`
  border-radius: 18px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: default;
`;

function PlayItem({item, tags}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewPlay, setPreviewPlay] = useState(false);
  const [focus, setFocus] = useState(false)
  const [ play, { stop, sound }] = useSound(item?.previewMusicUrl, { format: 'mp3' })

  const Preview = () => {
    return (
      item?.playMode === 0 && 
      <div className="preview" onClick={togglePreview} onMouseEnter={onFocus}>
        { !previewPlay ? <GoMute /> : <GoUnmute /> }
      </div>
    )
  }

  const Stars = () => {
    return (
      <div className="stars">
        {Array(item.difficulty).fill(null).map((_, idx) => <Star key={idx} />)}
      </div>
    )
  }

  const Tags = () => {
    const tags = item?.tag?.split('#').filter(tag => tag);
    return tags.map(tag => <Tag key={tag}> { `#${tag}` } </Tag>)
  }

  useEffect(() => {
    if (previewPlay) {
      play()
      sound?.fade(0, 1, 2000)
    } else {
      stop()
    }
  },[previewPlay])
  
  const startStage = () => {
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
    if (focus) {
      setFocus(false)
    }
  }

  const onFocus = () => {
    setFocus(true)  
  }

  return (
    <ItemWrapper >
      <ThumbnailWrapper onMouseLeave={stopPreview}>
        <HoverVideoPlayer
          onClick={startStage}
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
          playbackRangeEnd={5}
          restartOnPaused={true}
          focused={focus}
        />
        <Preview/>
      </ThumbnailWrapper>
      <InfoWrapper>
        <H2>
          {item?.title}
        </H2>
        <Stars />
      </InfoWrapper>
      { tags &&
      <TagWrapper>
        <Tags />
      </TagWrapper>}
    </ItemWrapper>
  );
}

export default PlayItem;

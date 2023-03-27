import React from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setStageItem } from "../../store/stageSlice";
import {Wrapper, H2, PinkButton} from "../common/ui/Semantics";
import {TbStarFilled} from "react-icons/tb";
import testImg from "../../assets/images/fd2.png";

const ItemWrapper = styled(Wrapper)`
  width: 100%;
  height: 100%; // ?
  justify-content: normal;
  cursor: pointer;
  .thumbnail {
    width: 100%;
    border-radius: 12px;
  }
`;

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

  const startStage = () => {
    dispatch(setStageItem(item))
    navigate(`/play/${item.playMode}/${item.songIdx}`)
  }

  return (
    <ItemWrapper onClick={startStage}>
      <img className="thumbnail" src={item.thumbnailUrl === 'url' ? testImg : item.thumbnailUrl} alt="thumbnail"/>
      <InfoWrapper>
        <H2>
          {item?.title}
        </H2>
        <Stars />
      </InfoWrapper>
      {tags &&
      <TagWrapper>
        <Tags />
      </TagWrapper>}
    </ItemWrapper>
  );
}

export default PlayItem;

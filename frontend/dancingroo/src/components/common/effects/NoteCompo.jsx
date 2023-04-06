import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import note1 from '../../../assets/images/musical-note-yellow .png';
import note2 from '../../../assets/images/musical-note-green.png';
import note3 from '../../../assets/images/musical-note-green-couple.png';
import note4 from '../../../assets/images/musical-note-blue-couple.png';
import note5 from '../../../assets/images/musical-note-red.png';

const Note = styled.img`
  position: fixed;
  width: 2.5rem;
  animation: float 5s infinite ease-in-out;
  margin: 10px;
  display: inline-block;
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  &:hover {
    filter: brightness(150%);
    cursor: pointer;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const NoteCompo = () => {
  /* eslint-disable */
  const [positions, setPositions] = useState([]);

  const generateNote = (min, max, index) => {
    const srcOptions = [note1, note2, note3, note4, note5];
    const src = srcOptions[Math.floor(Math.random() * srcOptions.length)];

    let top, left, right;
    do {
      top = Math.floor(Math.random() * (max - min)) + min;
      left = Math.floor(Math.random() * 10);
      right = Math.floor(Math.random() * 10);
    } while (
      positions.some(
        ({ prevTop, prevLeft, prevRight }) =>
          Math.abs(prevTop - top) < 85 &&
          Math.abs(prevLeft - left) < 80 &&
          Math.abs(prevRight - right) < 80
      )
    );

    const noteStyle = {
      top: `${top}%`,
      ...(index === 0 ? { left: `${left}%` } : { right: `${right}%` }),
    };

    return (
      <Note
        key={`${min}-${index}`}
        style={noteStyle}
        src={src}
        onClick={() => handleClick(min, max, index)}
      />
    );
  };

  const handleClick = (min, max, index) => {
    const updatedPositions = positions.filter(
      ({ prevTop }) => !(prevTop >= min && prevTop < max)
    );
    setPositions([...updatedPositions, ...generatePositions(min, max, index)]);
  };

  const generatePositions = (min, max, index) => {
    const { top, left, right } = generateNote(min, max, index).props.style;
    return [{ prevTop: top, prevLeft: left, prevRight: right }];
  };

  useEffect(() => {
    const newPositions = [];
    notesConfig.forEach(({ min, max }) => {
      newPositions.push(...generatePositions(min, max, 0));
    });
    setPositions(newPositions);
  }, []);

  const notesConfig = [
    { min: 20, max: 45 },
    { min: 45, max: 65 },
    { min: 65, max: 95 },
  ];

  const notes = notesConfig.flatMap(({ min, max }, index) => {
    const count = positions.filter(
      ({ prevTop }) => prevTop >= min && prevTop < max
    ).length;
    return Array(1 + (count < 1 ? 1 : 0))
      .fill()
      .map((_, index) => generateNote(min, max, index));
  });

  return <>{notes}</>;
};

export default NoteCompo;
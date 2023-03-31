import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import note1 from '../../../assets/images/musical-note-yellow .png';
import note2 from '../../../assets/images/musical-note-green.png';
import note3 from '../../../assets/images/musical-note-green-couple.png';
import note4 from '../../../assets/images/musical-note-blue-couple.png';

const Note = styled.img`
  position: fixed;
  width: 3rem;
  animation: float 5s infinite ease-in-out;
  margin: 10px;
`;

const NoteCompo = () => {
  const [positions, setPositions] = useState([]);

  const notes = [
    { min: 20, max: 40 },
    { min: 40, max: 60 },
    { min: 70, max: 100 },
  ].flatMap(({ min, max }) => {
    const count = positions.filter(
      ({ prevTop }) => prevTop >= min && prevTop < max
    ).length;
    return Array(1 + (count < 1 ? 1 : 0))
      .fill()
      .map((_, index) => {
        const srcOptions = [note1, note2, note3, note4];
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

        return <Note key={`${min}-${index}`} style={noteStyle} src={src} />;
      });
  });

  useEffect(() => {
    const newPositions = notes.map((note) => {
      const { top, left, right } = note.props.style;
      return { prevTop: top, prevLeft: left, prevRight: right };
    });
    setPositions(newPositions);
  }, []);

  return <>{notes}</>;
};

export default NoteCompo;

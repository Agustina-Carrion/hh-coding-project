import React, { useState, useEffect } from 'react';

// Import sound files
import horseSound from '../assets/audio/horse.mp3';
import tadaSound from '../assets/audio/Ta_Da.mp3';
import minionSound from '../assets/audio/minion_laugh.mp3';
import drumRollSound from '../assets/audio/Drum_Roll.mp3';

// Import image files
import tada from '../assets/images/tada.jpg';


// Define the game board
const SOUNDS = [
  { name: 'horse', file: horseSound },
  { name: 'tada', file: tadaSound },
  { name: 'minion', file: minionSound },
  { name: 'drum', file: drumRollSound },
];

// Shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function SoundMatchGame() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  // Generate a new game board
  useEffect(() => {
    const soundPairs = SOUNDS.concat(SOUNDS);
    const shuffledSounds = shuffleArray(soundPairs);
    const newBoard = shuffledSounds.map((sound, index) => ({
      id: index,
      sound: sound.name,
      file: sound.file,
      flipped: false,
    }));
    setBoard(newBoard);
    setSelected([]);
    setMatched([]);
  }, []);

  // Handle a card being clicked
  function handleCardClick(card) {
    if (selected.length === 0) {
      setSelected([card.id, card.sound]);
    } else if (selected.length === 2) {
      // Flip both cards back over
      setBoard((prevState) =>
        prevState.map((card) => ({
          ...card,
          flipped: matched.includes(card.id) ? true : false,
        }))
      );
      setSelected([]);
    } else if (selected[1] === card.sound) {
      // Match found!
      setMatched((prevState) => [...prevState, selected[0], card.id]);
      setSelected([]);
    } else {
      setSelected((prevState) => [...prevState, card.id, card.sound]);
    }
    setBoard((prevState) =>
      prevState.map((prevCard) =>
        prevCard.id === card.id ? { ...prevCard, flipped: true } : prevCard
      )
    );
    
    // Play the sound file associated with the card
    const audioElement = new Audio(card.file);
    audioElement.play();
  }
  

  return (
    <div className="game">
      <h1>Sound Match Game</h1>
      <div className="board">
        {board.map((card) => (
          <div
            key={card.id}
            className={`card ${matched.includes(card.id) ? 'matched' : ''}`}
            onClick={() => {
              if (!matched.includes(card.id)) handleCardClick(card);
            }}
          >
            <div className={`card-front ${card.flipped ? 'flipped' : ''}`}>
              <img src={`../assets/images/${card.sound}.jpg`} alt={card.sound} />
            </div>
            <div className={`card-back ${card.flipped ? 'flipped' : ''}`}>
              <audio src={card.file} autoPlay={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoundMatchGame;

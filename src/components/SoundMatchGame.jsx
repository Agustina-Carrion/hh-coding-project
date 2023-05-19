import React, { useState, useEffect } from 'react';

// Import sound files
import horseSound from '../assets/audio/horse.mp3';
import tadaSound from '../assets/audio/Ta_Da.mp3';
import minionSound from '../assets/audio/minion_laugh.mp3';
import drumRollSound from '../assets/audio/Drum_Roll.mp3';

// create an array of sound objects
const SOUNDS = [
  { name: 'horse', file: horseSound },
  { name: 'tada', file: tadaSound },
  { name: 'minion', file: minionSound },
  { name: 'drum', file: drumRollSound },
];

// function to shuffle the array of sounds randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swap the array[i] element with a randomly chosen other one
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Main SoundMatchGame component
function SoundMatchGame() {
  const [board, setBoard] = useState([]); // Represents the game board
  const [selected, setSelected] = useState([]); // Represents selected card(s)
  const [matched, setMatched] = useState([]); // Represents matched cards
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
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
    setGameOver(false);
  };

  function handleCardClick(card) {
    if (matched.includes(card.id) || selected.includes(card.id)) return;
    
    if (selected.length === 0) {
      setSelected([card.id]);
    } else if (selected.length === 1) {
      if (board[selected[0]].sound === card.sound) {
        setMatched((prevState) => [...prevState, selected[0], card.id]);
        setSelected([]);
      } else {
        setSelected([selected[0], card.id]);
      }
    } else if (selected.length === 2) {
      setSelected([card.id]);
    }

    setBoard((prevState) =>
      prevState.map((prevCard) =>
        prevCard.id === card.id ? { ...prevCard, flipped: true } : prevCard
      )
    );

    const audioElement = new Audio(card.file);
    audioElement.play();
  }

  useEffect(() => {
    if (selected.length === 2) {
      setTimeout(() => {
        setBoard((prevState) =>
          prevState.map((prevCard) =>
            selected.includes(prevCard.id) ? { ...prevCard, flipped: false } : prevCard
          )
        );
        setSelected([]);
      }, 1000);
    }
    if (matched.length === SOUNDS.length * 2) {
      setGameOver(true);
    }
  }, [selected, matched]);

  

  return (
    <div className="game">
      <h1>Sound Match Game</h1>
      <div className="board">
        {board.map((card) => (
          <div
          key={card.id}
          className={`card ${matched.includes(card.id) ? 'matched' : ''}`}
          onClick={() => {
            // Only allow the card to be clicked if it's not already matched
            if (!matched.includes(card.id)) handleCardClick(card);
          }}
          >
            <div className={`card-front ${card.flipped ? 'flipped' : ''}`}>
            </div>
            <div className={`card-back ${card.flipped ? 'flipped' : ''}`}>
               {/* The audio is associated with the card, but won't play automatically */}
              <audio src={card.file} autoPlay={false} />
            </div>
          </div>
        ))}
      </div>
      <br />
      {gameOver && <button onClick={newGame}>New game?</button>}
    </div>
  );
}

export default SoundMatchGame;

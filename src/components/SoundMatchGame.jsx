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

  // generate a new game board when the component mounts
  useEffect(() => {
    const soundPairs = SOUNDS.concat(SOUNDS); // create a pair for each sound
    const shuffledSounds = shuffleArray(soundPairs); // shuffle the pairs
    const newBoard = shuffledSounds.map((sound, index) => ({ // map each sound object to a new object with additional properties
      id: index,
      sound: sound.name,
      file: sound.file,
      flipped: false,
    }));
    setBoard(newBoard); // set the state with the newly created game board
    setSelected([]); // reset the selected cards array
    setMatched([]); // reset the matched cards array
  }, []);

  console.log(selected)
  // Handle a card being clicked
  function handleCardClick(card) {
    // If no card has been selected yet
    if (selected.length === 0) {
      setSelected([card.id, card.sound]);
    // If two cards have already been selected
    } else if (selected.length === 2) {
      // Flip both cards back over
      setBoard((prevState) =>
        prevState.map((card) => ({
          ...card,
          flipped: matched.includes(card.id) ? true : false,
        }))
      );
      setSelected([]); // reset the selected cards array
      // If a card has already been selected and the newly selected card matches the previously selected card
      } else if (selected[1] === card.sound) {
    } else if (selected[1] === card.sound) {
      // Match found!
      setMatched((prevState) => [...prevState, selected[0], card.id]);
      setSelected([]); // reset the selected cards array
    } else {
      setSelected((prevState) => [...prevState, card.id, card.sound]);
    }
    // Flip the clicked card
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
               // Only allow the card to be clicked if it's not already matched
              if (!matched.includes(card.id)) handleCardClick(card);
            }}
          >
            <div className={`card-front ${card.flipped ? 'flipped' : ''}`}>
              {/* This is where you could add an image or something visual for the card front */}
              {/* <img src={`../assets/images/${card.sound}.jpg`} alt={card.sound} /> */}
            </div>
            <div className={`card-back ${card.flipped ? 'flipped' : ''}`}>
               {/* The audio is associated with the card, but won't play automatically */}
              <audio src={card.file} autoPlay={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoundMatchGame;

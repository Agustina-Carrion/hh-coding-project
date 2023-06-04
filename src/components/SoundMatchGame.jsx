import { useState, useEffect } from 'react';

// Import sound files
import horseSound from '../assets/audio/horse.mp3';
import tadaSound from '../assets/audio/ta_da.mp3';
import minionSound from '../assets/audio/minion_laugh.mp3';
import drumRollSound from '../assets/audio/drum_roll.mp3';
import balloonSound from '../assets/audio/balloon_squeaky.mp3';
import minionHelloSound from '../assets/audio/minion_hello.mp3';
import piggySound from '../assets/audio/piggy.mp3';
import roosterSound from '../assets/audio/rooster.mp3';

// create an array of sound objects
const SOUNDS = [
  { name: 'horse', file: horseSound },
  { name: 'tada', file: tadaSound },
  { name: 'minion', file: minionSound },
  { name: 'drum', file: drumRollSound },
  { name: 'balloon', file: balloonSound },
  { name: 'minionH', file: minionHelloSound },
  { name: 'piggy', file: piggySound },
  { name: 'rooster', file: roosterSound },
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
  const [disableClick, setDisableClick] = useState(false);

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
    if (disableClick || matched.includes(card.id) || selected.includes(card.id)) return;
    
    if (selected.length === 0) {
      setSelected([card]);
    } else if (selected.length === 1) {
      if (selected[0].sound === card.sound) {
        setMatched((prevState) => [...prevState, selected[0].id, card.id]);
        setSelected([]);
      } else {
        setSelected([selected[0], card]);
        setDisableClick(true);
      }
    } else if (selected.length === 2) {
      setSelected([card]);
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
            selected.map((card) => card.id).includes(prevCard.id)
              ? { ...prevCard, flipped: false } 
              : prevCard
          )
        );
        setSelected([]);
        setDisableClick(false);
      }, 1000);
    }
    if (matched.length === SOUNDS.length * 2) {
      setGameOver(true);
    }
  }, [selected, matched]);
  
  return (
    <div className="flex flex-col items-center pb-20 px-4 mt-12">
      {/* todo: rout to subpage */}
      {gameOver ? <h1 className='text-purple-900 dark:text-white font-bold text-center text-4xl mb-8 cursor-pointer' onClick={newGame}>New game?</h1>
                : <h1 className='text-purple-900 dark:text-white font-bold text-center text-4xl mb-8'>Sound Match Game</h1>}
      <div className="flex flex-wrap justify-center max-w-3xl">
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
    </div>
  );
}

export default SoundMatchGame;

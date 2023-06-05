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

// create an array of objects where each object represents a sound
// each object has a name (which is used for matching) and the actual audio file
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

// function to shuffle the order of elements in an array
// this is used to randomize the game board every new game
function shuffleArray(array) {
  // We start from the end of the array and swap each element with a random one before it
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swap the array[i] element with a randomly chosen (j) other one
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Main SoundMatchGame component
function SoundMatchGame() {
  // We have several pieces of state:
  // board: The current game board. Each card is represented by an object with its ID, sound, audio file, and whether it is flipped
  // selected: An array of cards currently selected by the user
  // matched: An array of IDs of cards that have been matched
  // gameOver: A boolean that is true when the game is over
  // disableClick: A boolean that is used to prevent clicking while cards are being flipped back
  const [board, setBoard] = useState([]); // Initialize to an empty array
  const [selected, setSelected] = useState([]); // Initialize to an empty array
  const [matched, setMatched] = useState([]); // Initialize to an empty array
  const [gameOver, setGameOver] = useState(false); // Initialize to false
  const [disableClick, setDisableClick] = useState(false); // Initialize to false

  // When the component mounts, we start a new game
  useEffect(() => {
    newGame();
  }, []);

  // This function starts a new game
  const newGame = () => {
    // We create pairs for each sound and shuffle them to randomize the game board
    const soundPairs = SOUNDS.concat(SOUNDS);
    const shuffledSounds = shuffleArray(soundPairs);
    const newBoard = shuffledSounds.map((sound, index) => ({
      id: index,
      sound: sound.name,
      file: sound.file,
      flipped: false,
    }));
    // We set the new game board and reset the state
    setBoard(newBoard);
    setSelected([]);
    setMatched([]);
    setGameOver(false);
  };

  // This function is called when a card is clicked
  function handleCardClick(card) {
    // If clicking is disabled, or if the clicked card is already matched or selected, do nothing
    if (disableClick || matched.includes(card.id) || selected.includes(card.id)) return;
    
    // Depending on how many cards are already selected, do different things:
    if (selected.length === 0) {
      // If no cards are selected, we just select the clicked card
      setSelected([card]);
    } else if (selected.length === 1) {
      // If one card is selected, we check if it matches the clicked card
      if (selected[0].sound === card.sound) {
        // If the card matches the already selected one, we add them both to the matched cards
        setMatched((prevState) => [...prevState, selected[0].id, card.id]);
        // And clear the selected cards
        setSelected([]);
      } else {
        // If the card doesn't match the already selected one, we add it to the selected cards
        setSelected([selected[0], card]);
        // And disable clicking so that the user can't select more cards before these ones flip back
        setDisableClick(true);
      }
    } else if (selected.length === 2) {
      // If two cards are selected and don't match (otherwise they would have been removed in the previous block), 
      // we clear them and select the clicked card
      setSelected([card]);
    }

    // In any case, we flip the clicked card
    setBoard((prevState) =>
      prevState.map((prevCard) =>
        prevCard.id === card.id ? { ...prevCard, flipped: true } : prevCard
      )
    );

    // We play the sound of the clicked card
    const audioElement = new Audio(card.file);
    audioElement.play();
  }

  // This effect runs whenever the selected or matched cards change
  useEffect(() => {
    if (selected.length === 2) {
      // If two cards are selected, we wait for a second and then flip them back
      setTimeout(() => {
        setBoard((prevState) =>
          prevState.map((prevCard) =>
            selected.map((card) => card.id).includes(prevCard.id)
              ? { ...prevCard, flipped: false } 
              : prevCard
          )
        );
        // And clear the selected cards
        setSelected([]);
        // And enable clicking again
        setDisableClick(false);
      }, 1000);
    }
    if (matched.length === SOUNDS.length * 2) {
      // If all cards have been matched, we mark the game as over
      setGameOver(true);
    }
  }, [selected, matched]);
  
  // The render method returns the game board
  // It includes a title that changes based on whether the game is over and allows starting a new game
  // It maps over the board state to create the card elements
  // The onClick handler on each card calls handleCardClick with the card object
  // The className on each card is used to apply different styles to matched and flipped cards
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

import GameboardHandler from './Gameboard';

const Player = () => {
  const createPlayer = (name, isCPU = false) => {
    const player = {
      name,
      gameboard: GameboardHandler.createGameboard(),
      isWinner: false,
      isCPU,
    };
    return player;
  };

  const getCPUCoordinates = (gameboard) => {
    const coordinates = {
      row: Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
    };

    const error = GameboardHandler.checkInvalidInput(gameboard, coordinates);

    if (error) {
      return getCPUCoordinates(gameboard);
    }

    return coordinates;
  };

  const attack = (gameboard, coordinates) => {
    GameboardHandler.receiveAttack(gameboard, coordinates);
  };

  const setWinner = (player) => (player.isWinner = true);

  return {
    createPlayer,
    attack,
    getCPUCoordinates,
    setWinner,
  };
};

export default Player();

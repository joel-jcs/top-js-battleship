const Gameboard = () => {
  const createGameboard = () => {
    const rows = 10;
    const cols = 10;
    const gameboard = [];
    for (let i = 0; i < rows; i++) {
      gameboard.push([]);
      for (let j = 0; j < cols; j++) {
        gameboard[i].push('');
      }
    }
    return gameboard;
  };

  return { createGameboard };
};

module.exports = Gameboard();

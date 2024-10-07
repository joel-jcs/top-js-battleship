import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import EventHandler from './EventHandler';
import DOMHandler from './DOMHandler';

const GameManager = () => {
  const initGame = () => {
    DOMHandler.renderSettings();
    DOMHandler.renderGameboards();
  };

  const createPlayers = () => {
    const player1 = PlayerHandler.createPlayer('player1');
    const player2 = PlayerHandler.createPlayer('player2', true);
    return { player1, player2 };
  };

  const checkWinner = (player, opponent) => {
    const arePlayer1ShipsSunk = GameboardHandler.areAllShipsSunk(
      player.gameboard,
    );
    const arePlayer2ShipsSunk = GameboardHandler.areAllShipsSunk(
      opponent.gameboard,
    );
    console.log(arePlayer1ShipsSunk, arePlayer2ShipsSunk);
    if (arePlayer1ShipsSunk) {
      PlayerHandler.setWinner(opponent);
      alert(`Game Over! ${opponent.name} has won the game!`);
    } else if (arePlayer2ShipsSunk) {
      PlayerHandler.setWinner(player);
      alert(`Game Over! ${player.name} has won the game!`);
    }
  };

  const startTurn = (player, opponent) => {
    console.log(player, opponent);
    const winnerFound = checkWinner(player, opponent);
    if (winnerFound) return;
    if (player.name === 'player1') {
      const player2Grid = document.getElementById('player2-grid');
      EventHandler.attackListener(player, opponent, player2Grid);
    } else {
      const player1Grid = document.getElementById('player1-grid');
      const coordinates = PlayerHandler.getCPUCoordinates(opponent.gameboard);
      PlayerHandler.attack(opponent.gameboard, coordinates);
      DOMHandler.updateBoard(player1Grid, opponent.gameboard, coordinates);
    }
  };

  return { initGame, createPlayers, startTurn };
};
export default GameManager();

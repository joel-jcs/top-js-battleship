import GameboardHandler from './Gameboard';
import PlayerHandler from './Player';
import EventHandler from './EventHandler';
import DOMHandler from './DOMHandler';

const GameManager = () => {
  const initGame = () => {
    DOMHandler.renderInfoContainer();
    DOMHandler.renderGameboards();
  };

  const createPlayers = () => {
    const player1 = PlayerHandler.createPlayer('Player 1');
    const player2 = PlayerHandler.createPlayer('CPU', true);
    return { player1, player2 };
  };

  const checkWinner = (player, opponent) => {
    const arePlayer1ShipsSunk = GameboardHandler.areAllShipsSunk(
      player.gameboard,
    );
    const arePlayer2ShipsSunk = GameboardHandler.areAllShipsSunk(
      opponent.gameboard,
    );
    if (arePlayer1ShipsSunk) {
      PlayerHandler.setWinner(opponent);
      // alert(`Game Over! ${opponent.name} has won the game!`);
    }
    if (arePlayer2ShipsSunk) {
      PlayerHandler.setWinner(player);
      // alert(`Game Over! ${player.name} has won the game!`);
    }

    const winnerFound = arePlayer1ShipsSunk
      ? arePlayer2ShipsSunk
      : arePlayer1ShipsSunk;
    return winnerFound;
  };

  const startTurn = (player, opponent) => {
    const winnerFound = checkWinner(player, opponent);
    if (winnerFound) return;
    if (player.name !== 'CPU') {
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

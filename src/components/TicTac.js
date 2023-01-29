import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex',
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
};

const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

function Square({ squareId, onHandleClick, player, marked }) {
  return (
    <div
      className='square'
      style={squareStyle}
      onClick={() => onHandleClick(squareId, player)}
    >
      {marked}
    </div>
  );
}

function Board({ handleClick, player, playerMark, winner, onHandleRest }) {
  const playerCode = player ? 'X' : 'O';
  return (
    <div style={containerStyle} className='gameBoard'>
      <div id='statusArea' className='status' style={instructionsStyle}>
        Next player: <span>{playerCode}</span>
      </div>
      <div id='winnerArea' className='winner' style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={onHandleRest}>
        Reset
      </button>
      <div style={boardStyle}>
        {Array(3)
          .fill('')
          .map((data, i) => {
            const index = 3 * i;
            return (
              <div className='board-row' key={index} style={rowStyle}>
                <Square
                  key={index}
                  squareId={index}
                  onHandleClick={handleClick}
                  player={player}
                  marked={playerMark?.[index]?.player || ''}
                />
                <Square
                  key={index + 1}
                  squareId={index + 1}
                  onHandleClick={handleClick}
                  player={player}
                  marked={playerMark?.[index + 1]?.player || ''}
                />
                <Square
                  key={index + 2}
                  squareId={index + 2}
                  onHandleClick={handleClick}
                  player={player}
                  marked={playerMark?.[index + 2]?.player || ''}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

function Game() {
  const [playerMark, setPlayerMark] = useState(Array(9).fill(''));
  const [isPlayerX, setPlayerX] = useState(true);
  const [winner, setWinner] = useState('none');

  useEffect(() => {
    winnerCheck();
  }, [playerMark]);

  const userClicked = (id, player) => {
    const playerCode = player ? 'X' : 'O';
    const newStatue = playerMark?.map((data, i) => {
      if (i === id && !data?.player && winner === 'none') {
        setPlayerX(!isPlayerX);
        return { id, player: playerCode };
      }
      return data;
    });
    setPlayerMark(newStatue);
  };

  function winnerCheck() {
    const winnerSet = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const filterXPoints = playerMark
      .filter((x) => x.player === 'X')
      .map((x) => x.id)
      .sort();
    const filterYPoints = playerMark
      .filter((y) => y.player === 'O')
      .map((y) => y.id)
      .sort();
    const checkXWinner = (currentValue) => filterXPoints.includes(currentValue);
    const checkYWinner = (currentValue) => filterYPoints.includes(currentValue);

    const xResult = winnerSet.map((arr) => arr.every(checkXWinner));
    const yResult = winnerSet.map((arr) => arr.every(checkYWinner));

    if (xResult.includes(true)) {
      setWinner('X');
    } else if (yResult.includes(true)) {
      setWinner('O');
    }
  }

  function onHandleRest() {
    setPlayerMark(Array(9).fill(''));
    setWinner('none');
    setPlayerX(true);
  }

  return (
    <div className='game'>
      You are offline! please play Tic Tac Toe for now!
      <div className='game-board'>
        <Board
          handleClick={userClicked}
          player={isPlayerX}
          playerMark={playerMark}
          winner={winner}
          onHandleRest={onHandleRest}
        />
      </div>
    </div>
  );
}

export default Game;

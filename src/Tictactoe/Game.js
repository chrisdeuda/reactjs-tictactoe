import React, { Component } from "react";
import calculateWinner from "./calculateWinner";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          index: null,
          isActive: false,
        },
      ],
      movesIndex: {
        9: [0, 0],
        0: [1, 1],
        1: [1, 2],
        2: [2, 3],
        3: [2, 1],
        4: [2, 2],
        5: [2, 3],
        6: [3, 1],
        7: [3, 2],
        8: [3, 3],
      },
      stepNumber: 0,
      xIsNext: true,
      activeCell: null,
      boxes: {
        0: false,
      },
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          index: i,
          isActive: false,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      activeCell: null,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    let parent = this;

    setTimeout(() => {
      parent.setState({
        activeCell: parent.getCurrentSquare().index,
      });
    }, 300);
  }

  getCurrentSquare() {
    const history = this.state.history;
    return history[this.state.stepNumber];
  }

  initSquareStatus() {
    let box = this.state.boxes;

    console.log(typeof box);
    for (let index = 0; index < 9; index++) {
      box[index] = false;
    }

    this.setState({
      boxes: box,
    });
  }

  componentDidMount() {
    this.initSquareStatus();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let rowColMoves = this.state.movesIndex;

    const moves = history.map((step, move, index) => {
      let colRow = rowColMoves[step.index];
      const desc = move
        ? `Go to move #${move} ( ${colRow} )`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            date-row-col-move={step.index}
            onClick={() => this.jumpTo(move)}
          >
            {desc}{" "}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            active_cell={this.state.activeCell}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

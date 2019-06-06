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
    this.initSquareStatus();
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });

    let parent = this;
    this.initSquareStatus();

    setTimeout(() => {
      const activeCell = parent.getCurrentSquare().index;
      let list = [];

      list.push(activeCell);
      this.updateActiveCell(list);
    }, 300);
  }
  /**
   *
   * @param {*} square_list - array of index of cell to be updated
   */
  updateActiveCell(square_list) {
    const boxes = this.state.boxes;

    for (let index = 0; index < square_list.length; index++) {
      const element = square_list[index];
      if (boxes.hasOwnProperty(element)) {
        boxes[element] = true;
      }
    }
    this.setState({
      boxes: boxes,
    });
  }

  getCurrentSquare() {
    const history = this.state.history;
    return history[this.state.stepNumber];
  }

  initSquareStatus() {
    let box = this.state.boxes;

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
      status = `Winner: ${winner.player}`;
      console.log(winner);
      // Render the Red Marks
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            active_cell={this.state.activeCell}
            squares={current.squares}
            boxes={this.state.boxes}
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

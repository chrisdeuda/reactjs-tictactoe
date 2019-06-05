import React, { Component } from "react";
import Square from "./Square";

class Board extends React.Component {
  createBox() {
    let boxes = [];
    let index = 0;

    for (let col = 0; col < 3; col++) {
      let box = [];

      for (let row = 0; row < 3; row++) {
        box.push(this.renderSquare(index, row, col));
        index++;
      }
      boxes.push(
        <div key={col} className="board-row">
          {box}
        </div>
      );
    }
    return boxes;
  }

  renderSquare(i, row, col) {
    return (
      <Square
        data-row={row}
        data-col={col}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return <div>{this.createBox()}</div>;
  }
}

export default Board;

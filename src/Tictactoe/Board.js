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
    const is_active_cell = this.props.active_cell == i ? true : false;
    return (
      <Square
        data-row={row}
        data-col={col}
        data_index={i}
        is_active_cell={is_active_cell}
        // data-isActive={this.props.squares[i].isActive}
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

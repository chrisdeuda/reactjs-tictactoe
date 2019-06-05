import React, { Component } from "react";

function Square(props) {
  const classess = `square ${props.is_active_cell ? "active" : ""}`;

  return (
    <button className={classess} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;

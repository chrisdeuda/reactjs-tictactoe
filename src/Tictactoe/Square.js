import React, { Component } from "react";

function Square(props) {
  const classess = `square ${
    props.data_index == props.active_cell ? "active" : ""
  }`;

  return (
    <button className={classess} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;

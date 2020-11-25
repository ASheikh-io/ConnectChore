import React, { Component } from "react";
import { connect } from "react-redux";
import { dropTile } from "../../actions/gameActions";
import "./game.css";

class GridCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    board : this.props.game.board,
    x: this.props.x,
    y: this.props.y,
    }
    
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let y = 3; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        if (board[y][x]) {
          if (
            board[y][x] === board[y - 1][x] &&
            board[y][x] === board[y - 2][x] &&
            board[y][x] === board[y - 3][x]
          ) {
            return board[y][x];
          }
        }
      }
    }
  }

  // checkHorizontal(board) {
  //   // Check only if column is 3 or less
  //   for (let y = 0; y < 6; y++) {
  //     for (let x = 0; x < 4; x++) {
  //       if (board[y][x]) {
  //         if (
  //           board[y][x] === board[y][x + 1] &&
  //           board[y][x] === board[y][x + 2] &&
  //           board[y][x] === board[y][x + 3]
  //         ) {
  //           return board[y][x];
  //         }
  //       }
  //     }
  //   }
  // }

  // checkDiagonalRight(board) {
  //   // Check only if row is 3 or greater AND column is 3 or less
  //   for (let y = 3; y < 6; y++) {
  //     for (let x = 0; x < 4; x++) {
  //       if (board[y][x]) {
  //         if (
  //           board[y][x] === board[y - 1][x + 1] &&
  //           board[y][x] === board[y - 2][x + 2] &&
  //           board[y][x] === board[y - 3][x + 3]
  //         ) {
  //           return board[y][x];
  //         }
  //       }
  //     }
  //   }
  // }

  // checkDiagonalLeft(board) {
  //   // Check only if row is 3 or greater AND column is 3 or greater
  //   for (let y = 3; y < 6; y++) {
  //     for (let x = 3; x < 7; x++) {
  //       if (board[y][x]) {
  //         if (
  //           board[y][x] === board[y - 1][x - 1] &&
  //           board[y][x] === board[y - 2][x - 2] &&
  //           board[y][x] === board[y - 3][x - 3]
  //         ) {
  //           return board[y][x];
  //         }
  //       }
  //     }
  //   }
  // }

  // checkAll = (board) => {
  //   return (
  //     this.checkVertical(board) ||
  //     this.checkDiagonalRight(board) ||
  //     this.checkDiagonalLeft(board) ||
  //     this.checkHorizontal(board)
  //   );
  // };


  handleClick() {
    console.log(`clicked on columns ${this.props.x}`);

    this.props.sendTileDrop(this.props.x, this.props.y);

    // loop through the board prop
    this.checkAll();
    // check to see if there is 4 of the same color diagnoal
  }

  render() {
    const board = this.props.board;
    const x = this.props.x;
    const y = this.props.y;
    let classes = "cell";

    if (board[x][y] !== undefined) {
      if (board[x][y] === "red") {
        classes += "p2";
      } else {
        classes += "p1";
      }
    }
    return (
      <div
        className={classes}
        style={{ backgroundColor: this.props.color }}
        onClick={() => this.handleClick()}
      ></div>
    );
  }
}

const stateToProps = (state) => {
  return {
    board: state.game.board,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    sendTileDrop: (col, row) => dispatch(dropTile(col, row)),
  };
};

export default connect(stateToProps, dispatchToProps)(GridCell);

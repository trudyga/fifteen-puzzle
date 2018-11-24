import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import Tiles from './Tiles';
import GameEndCurtain from './GameEndCurtain';
import styles from './GameBoard.scss';

const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_RIGTH = 39;
const ARROW_UP = 38;
const ROWS = 4;
const COLUMNS = 4;

class GameBoard extends Component {
  static getInitialState = () => {
    const tiles = new Array(16);

    for (let i = 0; i < tiles.length - 1; i += 1) {
      const index = i;
      const value = index + 1;
      tiles[i] = {
        key: value,
        value: value.toString(),
        slot: i,
      };
    }

    tiles[15] = {
      key: 16,
      value: '',
      slot: 15,
    };

    return {
      tiles,
      empty: tiles[15],
      isFinished: false,
    };
  };

  state = GameBoard.getInitialState();

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyChange, false);
  }

  switch = slot => {
    this.setState(prevState => {
      const newTiles = [...prevState.tiles];
      const emptyTile = newTiles.find(tile => tile.value === '');
      const tileToMove = newTiles.find(tile => tile.slot === slot);
      const tmp = emptyTile.slot;
      emptyTile.slot = tileToMove.slot;
      tileToMove.slot = tmp;

      return {
        tiles: newTiles,
        empty: emptyTile,
        isFinished: this.testGameEnd(newTiles),
      };
    });
  };

  shuffle = () => {
    const { tiles } = this.state;

    let counter = tiles.length;
    const newTiles = [...tiles];

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter -= 1;

      let leftT = newTiles[counter];
      let rightT = newTiles[index];
      let temp = leftT.slot;
      newTiles[counter] = Object.assign({}, leftT, { slot: rightT.slot });
      newTiles[index] = Object.assign({}, rightT, { slot: temp });
    }

    const emptyTile = { ...newTiles.find(tile => tile.value === '') };
    this.setState({
      tiles: newTiles,
      isFinished: this.testGameEnd(newTiles),
      empty: emptyTile,
    });
  };

  testGameEnd(tiles) {
    const gameEnd = false;
    return !tiles.some(tile => tile.key - 1 !== tile.slot);
  }

  moveUp = () => {
    const { empty } = this.state;
    if (Math.floor(empty.slot / ROWS) === ROWS - 1) return;

    const slotToSwitch = empty.slot + ROWS;
    this.switch(slotToSwitch);
  };

  moveDown = () => {
    const { empty } = this.state;
    if (Math.floor(empty.slot / ROWS) === 0) return;

    const slotToSwitch = empty.slot - ROWS;
    this.switch(slotToSwitch);
  };

  moveRight = () => {
    const { empty } = this.state;
    if (empty.slot % COLUMNS === 0) return;

    const slotToSwitch = empty.slot - 1;
    this.switch(slotToSwitch);
  };

  moveLeft = () => {
    const { empty } = this.state;
    if (empty.slot % COLUMNS === COLUMNS - 1) return;

    const slotToSwitch = empty.slot + 1;
    this.switch(slotToSwitch);
  };

  handleKeyChange = event => {
    event.preventDefault();
    const { isFinished } = this.state;
    if (isFinished) {
      return;
    }

    switch (event.keyCode) {
      case ARROW_DOWN: {
        this.moveDown();
        break;
      }
      case ARROW_LEFT: {
        this.moveLeft();
        break;
      }
      case ARROW_RIGTH: {
        this.moveRight();
        break;
      }
      case ARROW_UP: {
        this.moveUp();
        break;
      }
      default:
        break;
    }
  };

  render() {
    const { tiles, isFinished } = this.state;

    return (
      <div className={styles.centered}>
        <div className={styles.game}>
          <div className={styles.board}>
            <Tiles tiles={tiles} />
            <GameEndCurtain isFinished={isFinished} />
          </div>
          <div className={styles.controls}>
            <button className={styles.shuffleBtn} onClick={this.shuffle}>
              Shuffle
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;

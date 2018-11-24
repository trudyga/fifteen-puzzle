import React, { Component } from 'react';
import Tile from './Tile';
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
        key: value.toString(),
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
    };
  };

  state = GameBoard.getInitialState();

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
        empty: { ...emptyTile },
      };
    });
  };

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

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyChange.bind(this), false);
  }

  handleKeyChange(event) {
    event.preventDefault();

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
  }

  render() {
    const { tiles } = this.state;

    return (
      <div className={styles.board}>
        {tiles
          .sort((l, r) => l.slot - r.slot)
          .map(item => (
            <Tile key={item.key} value={item.value} />
          ))}
      </div>
    );
  }
}

export default GameBoard;

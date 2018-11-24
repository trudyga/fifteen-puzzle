import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import styles from './Tiles.scss';

const Tiles = ({ tiles }) => (
  <div className={styles.tiles}>
    {tiles.map(item => (
      <Tile key={item.key} value={item.value} />
    ))}
  </div>
);
Tiles.propTypes = {
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      value: PropTypes.string,
      slot: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default React.memo(Tiles);

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Tile.scss';

const Tile = ({ value }) => {
  const tileClass = classnames(styles.tile, { [styles.empty]: !value });

  return (
    <div className={tileClass}>
      <span className={styles.content}>{value}</span>
    </div>
  );
};
Tile.propTypes = {
  value: PropTypes.string,
};

export default React.memo(Tile);

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './GameEndCurtain.scss';

const GameEndCurtain = ({ isFinished }) => {
  const curtainClass = classnames(styles.curtain, {
    [styles.visible]: isFinished,
  });

  return (
    <div className={curtainClass}>
      {isFinished && <span className={styles.info}>You won!</span>}
    </div>
  );
};
GameEndCurtain.propTypes = {
  isFinished: PropTypes.bool.isRequired,
};

export default React.memo(GameEndCurtain);

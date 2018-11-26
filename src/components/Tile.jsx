import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Tile.scss';

/**
 * Tile DOM element must be mounted only once during initial game board render
 * and must not change in order to animate tile flip
 */
class Tile extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    slot: PropTypes.number.isRequired, // slot prop change is required to trigger tile flip animation
  };

  /**
   * Memorize bounding client react before component update
   */
  getSnapshotBeforeUpdate() {
    const boundingBox = this.tileEl.getBoundingClientRect();
    return boundingBox;
  }

  /**
   * Animate tile movement by:
   * 1. Moving it to previous position without animation
   * 2. Returning it to required position with animation
   * @param {*} prevProps
   * @param {*} prevState
   * @param {Object} prevBoundingRect
   */
  componentDidUpdate(prevProps, prevState, prevBoundingRect) {
    const oldBox = prevBoundingRect;
    const newBox = this.tileEl.getBoundingClientRect();

    const deltaX = oldBox.left - newBox.left;
    const deltaY = oldBox.top - newBox.top;

    requestAnimationFrame(() => {
      this.tileEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      this.tileEl.style.transition = 'transform 0s';

      requestAnimationFrame(() => {
        this.tileEl.style.transform = '';
        this.tileEl.style.transition = 'transform 0.3s';
      });
    });
  }

  render() {
    const { value } = this.props;
    const tileClass = classnames(styles.tile, { [styles.empty]: !value });

    return (
      <div
        className={tileClass}
        ref={el => {
          this.tileEl = el;
        }}
      >
        <span className={styles.content}>{value}</span>
      </div>
    );
  }
}

export default Tile;

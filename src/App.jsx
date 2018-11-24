import React from 'react';
import GameBoard from './components/GameBoard';
import styles from './App.scss';

const App = () => (
  <div className={styles.fullscreen}>
    <GameBoard />
  </div>
);

export default App;

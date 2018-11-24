import React from 'react';
import GameBoard from './components/GameBoard';
import styles from './App.scss';

const App = () => (
  <div className={styles.app}>
    <div className={styles.centered}>
      <GameBoard />
    </div>
  </div>
);

export default App;

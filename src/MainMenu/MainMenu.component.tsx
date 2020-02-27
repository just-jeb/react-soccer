import React from 'react';
import styles from './MainMenu.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  lastGameId: string | undefined;
}

export const MainMenuComponent = React.memo<IProps>(({ lastGameId }) => (
  <div className={styles.mainMenu}>
    {lastGameId && (
      <Link to={`/game/${lastGameId}`} className={styles.menuItem}>
        <button className={styles.menuButton}>Resume game</button>
      </Link>
    )}
    <Link to="/game" className={styles.menuItem}>
      <button className={styles.menuButton}>New game</button>
    </Link>
    <Link to="/load-game" className={styles.menuItem}>
      <button className={styles.menuButton}>Load game</button>
    </Link>
  </div>
));

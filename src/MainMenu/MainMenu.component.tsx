import React from 'react'
import styles from './MainMenu.module.scss';
import {Link} from "react-router-dom";

export const MainMenuComponent = () => (
    <div className={styles.mainMenu}>
        <Link to='/game' className={styles.menuItem}>
            <button className={styles.menuButton}>New game</button>
        </Link>
        <Link to='/load-game' className={styles.menuItem}>
            <button className={styles.menuButton}>Load game</button>
        </Link>
    </div>
);
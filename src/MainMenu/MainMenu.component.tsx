import React from 'react'
import styles from './MainMenu.module.scss';
import {Link} from "react-router-dom";

interface MainMenuComponentProps {

}

export class MainMenuComponent extends React.PureComponent<MainMenuComponentProps> {
    constructor(props: MainMenuComponentProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={styles.mainMenu}>
                <Link to='/game' className={styles.menuItem}>
                    <button className={styles.menuButton}>New game</button>
                </Link>
                <Link to='/load-game' className={styles.menuItem}>
                    <button className={styles.menuButton}>Load game</button>
                </Link>
            </div>
        );
    }
}
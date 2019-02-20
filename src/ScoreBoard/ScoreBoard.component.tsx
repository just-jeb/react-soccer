import React from 'react';
import styles from './ScoreBoard.module.scss';
import classNames from 'classnames';
import {EPlayers} from "../types/game.types";

interface ScoreBoardProps {
    currentPlayer: EPlayers
}

export const ScoreBoardComponent = React.memo<ScoreBoardProps>(({currentPlayer}) => {
    const player1Classes = classNames({
        [styles.player1]: true,
        [styles.currentPlayer]: currentPlayer === EPlayers.PLAYER1
    });
    const player2Classes = classNames({
        [styles.player2]: true,
        [styles.currentPlayer]: currentPlayer === EPlayers.PLAYER2
    });
    console.log(styles);
    return (
        <span>
            <h2 className={player1Classes}>Player1</h2>  :   <h2 className={player2Classes}>Player2</h2>
        </span>
    );
});

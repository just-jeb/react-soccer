import React from 'react';
import {IPlayer} from "../types/game.types";
import styles from './ScoreBoard.module.scss';

interface ScoreBoardProps {
  currentPlayer: string
  players: IPlayer[];
}

export const ScoreBoardComponent = React.memo<ScoreBoardProps>(({currentPlayer, players}) => {
  return (
    <span>
            {
              players.map(({color, id, name}) =>
                <h2 style={{color}} key={id} className={id === currentPlayer ? styles.currentPlayer : ''}>{name}</h2>)
            }
        </span>
  );
});

import React from 'react'
import {ISavedGameHeader} from "../types/meta-game.types";
import {Link} from "react-router-dom";
import styles from './SavedGame.module.scss';

interface Props {
    savedGame: ISavedGameHeader;
}

//TODO: deal with (potentially) more than two players
export const SavedGameComponent = React.memo<Props>(({savedGame: {id, date, players: [p1, p2]}}) => (
    <Link to={`/game/${id}`}>
        <div className={styles.gameHeader}>
           <span style={{color: p1.color}}>{p1.name}</span>
           VS
           <span style={{color: p2.color}}>{p2.name}</span>
            <span>{date}</span>
       </div>
    </Link>
));
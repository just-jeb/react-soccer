import React from "react";
import ScoreContainer from '../ScoreBoard/ScoreBoard.container';
import FieldContainer from '../Field/Field.container';
import {EGameStatus} from "../types/game.types";

interface GameProps {
    initGame: () => void,
    gameStatus: EGameStatus
}

export class GameComponent extends React.PureComponent<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.initGame();
    }
    //TODO: use react-router to switch between screens
    render(): React.ReactNode {
        return this.props.gameStatus === EGameStatus.NotStarted ? <div/> : (
            <div>
                <ScoreContainer/>
                <FieldContainer/>
            </div>
        );
    }
}
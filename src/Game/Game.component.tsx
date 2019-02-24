import React from "react";
import ScoreContainer from '../ScoreBoard/ScoreBoard.container';
import FieldContainer from '../Field/Field.container';

interface GameProps {
    gameId: string,
    saveGame: () => void
}

export class GameComponent extends React.PureComponent<GameProps> {
    constructor(props: GameProps) {
        super(props);
    }

    //TODO: use react-router to switch between screens
    render(): React.ReactNode {
        return !this.props.gameId ? <div/> : (
            <div>
                <ScoreContainer/>
                <FieldContainer/>
                <button onClick={this.props.saveGame}>Save</button>
            </div>
        );
    }
}
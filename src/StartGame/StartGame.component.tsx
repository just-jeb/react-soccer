import React from 'react';
import GameContainer from '../Game/Game.container';

interface Props {
    match: {
        params: {
            id: string
        }
    },
    loadGame: (id: string) => void,
    startNewGame: () => void
}

export class StartGameComponent extends React.PureComponent<Props> {
    constructor(props: Props){
        super(props);
    }

    componentDidMount(): void {
        const {match: {params: {id}}, loadGame, startNewGame} = this.props;
        if(id){
            loadGame(id);
        } else {
            startNewGame();
            //TODO: update path param once id created
        }
    }


    render() {
        return (
            <GameContainer/>
        );
    }
}

import React from 'react';
import {IState} from "../store/state";
import {connect} from "react-redux";
import {GameComponent} from "./Game.component";
import {gameIdSelector} from "../store/selectors/game.selectors";
import {loadGame, saveGame, startNewGame} from "../store/actions/meta-game.actions";
import {RouteComponentProps} from "react-router";

interface Props extends RouteComponentProps<{ id: string }> {
    loadGame: (id: string) => void,
    startNewGame: () => void,
    saveGame: () => void,
    gameId: string
}
//TODO: save current game state in local storage on each turn (not saved games - separate entry)
class GameContainer extends React.PureComponent<Props> {
    componentDidMount(): void {
        const {match: {params: {id}}, loadGame, startNewGame} = this.props;
        if (id) {
            loadGame(id);
        } else {
            startNewGame();
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        const {gameId, match: {params: {id}}, location: {pathname}, history} = this.props;
        if (gameId && !id) {
            history.replace(`${pathname}/${gameId}`);
        }
    }

    render() {
        if (!this.props.gameId) {
            return null;
        } else if (!this.props.match.params.id) {

        }
        return (
            <>
                <GameComponent/>
                <button onClick={this.props.saveGame}>Save</button>
            </>
        )
    }
}


const mapStateToProps = (state: IState) => ({
    gameId: gameIdSelector(state)
});

export default connect(
    mapStateToProps,
    {saveGame, loadGame, startNewGame}
)(GameContainer);
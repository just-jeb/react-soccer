import {ThunkDispatch} from "redux-thunk";
import {IState} from "../store/state";
import {Action} from "redux";
import {loadGame} from "../store/actions/meta-game.actions";
import {connect} from "react-redux";
import {StartGameComponent} from "./StartGame.component";
import {startNewGame} from "../store/actions/game.actions";

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, Action<any>>) => ({
    loadGame: (id: string) => dispatch(loadGame(id)),
    startNewGame: () => dispatch(startNewGame())
});

export default connect(
    undefined,
    mapDispatchToProps
)(StartGameComponent);
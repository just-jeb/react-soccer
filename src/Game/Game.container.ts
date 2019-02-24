import {ThunkDispatch} from "redux-thunk";
import {IState} from "../store/state";
import {GameActions} from "../store/actions/game.actions";
import {connect} from "react-redux";
import {GameComponent} from "./Game.component";
import {gameIdSelector} from "../store/selectors/game.selectors";
import {saveGame} from "../store/actions/meta-game.actions";


const mapStateToProps = (state: IState) => ({
    gameId: gameIdSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, GameActions>) => ({
    saveGame: () => dispatch(saveGame())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);
import {ThunkDispatch} from "redux-thunk";
import {IState} from "../store/state";
import {GameActions, initializeGame} from "../store/actions/game.actions";
import {connect} from "react-redux";
import {GameComponent} from "./Game.component";
import {gameStatusSelector} from "../store/selectors/game.selectors";


const mapStateToProps = (state: IState) => ({
  gameStatus: gameStatusSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, GameActions>) => ({
    initGame: () => dispatch(initializeGame())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);
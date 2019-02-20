import {IState} from "../store/state";
import {possibleMovesSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {NextMovesGridComponent} from "./NextMovesGrid.component";
import {ThunkDispatch} from "redux-thunk";
import {GameActions} from "../store/actions/game.actions";


const mapStateToProps = (state: IState) => ({
    nextMoves: possibleMovesSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, GameActions>) => ({
    onClick: (id: string) => dispatch(GameActions.makeMove(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NextMovesGridComponent);
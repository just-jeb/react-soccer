import {IState} from "../store/state";
import {currentPlayerColorSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {NextMovesGridComponent} from "./NextMovesGrid.component";
import {makeMove} from "../store/actions/game.actions";
import {possibleMovesSelector} from "../store/selectors/field.selectors";

const mapStateToProps = (state: IState) => ({
    nextMoves: possibleMovesSelector(state),
    hintColor: currentPlayerColorSelector(state)
});

export default connect(
    mapStateToProps,
    {
        makeMove
    }
)(NextMovesGridComponent);
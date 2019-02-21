import {IState} from "../store/state";
import {currentPlayerSelector, playersSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {ScoreBoardComponent} from "./ScoreBoard.component";

const mapStateToProps = (state: IState) => ({
    currentPlayer: currentPlayerSelector(state),
    players: playersSelector(state)
});

export default connect(
    mapStateToProps
)(ScoreBoardComponent);
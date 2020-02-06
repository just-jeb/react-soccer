import {IState} from "../store/state";
import {currentPlayerSelector, looserSelector, playersSelector} from '../store/selectors/game.selectors';
import {connect} from "react-redux";
import {ScoreBoardComponent} from "./ScoreBoard.component";

const mapStateToProps = (state: IState) => ({
  currentPlayer: currentPlayerSelector(state),
  players: playersSelector(state),
  looser: looserSelector(state)
});

export default connect(
  mapStateToProps
)(ScoreBoardComponent);
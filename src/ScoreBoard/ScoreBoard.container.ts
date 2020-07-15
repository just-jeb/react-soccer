import { connect } from 'react-redux';
import {
  currentPlayerSelector,
  looserSelector,
  playersSelector,
} from '../store/selectors/game.selectors';
import { gameSettingsSelector } from '../store/selectors/settings.selector';
import { IState } from '../store/state';
import { ScoreBoardComponent } from './ScoreBoard.component';

const mapStateToProps = (state: IState) => ({
  currentPlayer: currentPlayerSelector(state),
  players: playersSelector(state),
  fieldSize: gameSettingsSelector(state).fieldSize,
  looser: looserSelector(state),
});

export default connect(mapStateToProps)(ScoreBoardComponent);

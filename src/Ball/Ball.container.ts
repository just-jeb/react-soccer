import { IState } from '../store/state';
import { ballPositionSelector } from '../store/selectors/field.selectors';
import { connect } from 'react-redux';
import { BallComponent } from './Ball.component';
import {
  currentPlayerDirectionSelector,
  gameStatusSelector,
} from '../store/selectors/game.selectors';

const mapStateToProps = (state: IState) => ({
  ballPosition: ballPositionSelector(state),
  direction: currentPlayerDirectionSelector(state),
  gameStatus: gameStatusSelector(state),
});

export default connect(mapStateToProps)(BallComponent);

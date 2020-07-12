import { connect } from 'react-redux';
import { FieldNodesComponent } from './FieldNodes.component';
import { IState } from '../store/state';
import {
  boostersSelector,
  nodesListSelector,
} from '../store/selectors/field.selectors';
import { currentPlayerColorSelector } from '../store/selectors/game.selectors';

const mapStateToProps = (state: IState) => ({
  nodes: nodesListSelector(state),
  boosters: boostersSelector(state),
  boosterColor: currentPlayerColorSelector(state),
});

export default connect(mapStateToProps)(FieldNodesComponent);

import { connect } from 'react-redux';
import { GoalsComponent } from './Goals.component';
import { IState } from '../store/state';
import { goalsSelector } from '../store/selectors/field.selectors';

const mapStateToProps = (state: IState) => ({
  goals: goalsSelector(state),
});

export default connect(mapStateToProps)(GoalsComponent);

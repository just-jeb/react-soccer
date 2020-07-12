import { IState } from '../store/state';
import { connect } from 'react-redux';
import { FieldComponent } from './Field.component';
import { gameSettingsSelector } from '../store/selectors/settings.selector';

const mapStateToProps = (state: IState) => {
  return {
    fieldSize: gameSettingsSelector(state).fieldSize,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FieldComponent);

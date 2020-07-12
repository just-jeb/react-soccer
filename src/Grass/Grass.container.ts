import { IState } from '../store/state';
import { gameSettingsSelector } from '../store/selectors/settings.selector';
import { connect } from 'react-redux';
import { GrassComponent } from './Grass.component';

const mapStateToProps = (state: IState) => {
  return {
    fieldSize: gameSettingsSelector(state).fieldSize,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GrassComponent);

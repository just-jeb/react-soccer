import {IState} from "../store/state";
import {connect} from "react-redux";
import {FieldComponent} from "./Field.component";
import {gameSettingsSelector} from "../store/selectors/settings.selector";
import {currentPlayerColorSelector} from "../store/selectors/game.selectors";

const mapStateToProps = (state: IState) => {
  return {
    fieldSize: gameSettingsSelector(state).fieldSize,
    bordersColor: currentPlayerColorSelector(state)
  }
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldComponent);
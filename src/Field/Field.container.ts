import {IState} from "../store/state";
import {nodeIdsSelector} from "../store/selectors/field.selectors";
import {connect} from "react-redux";
import {FieldComponent} from "./Field.component";
import {gameSettingsSelector} from "../store/selectors/settings.selector";
import {gameStatusSelector, playersSelector} from "../store/selectors/game.selectors";

const mapStateToProps = (state: IState) => {
    return {
        nodesIds: nodeIdsSelector(state),
        fieldSize: gameSettingsSelector(state).fieldSize,
        gameStatus: gameStatusSelector(state),
        players: playersSelector(state)
    }
};

const mapDispatchToProps = {  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldComponent);
import {IState} from "../store/state";
import {nodeIdsSelector} from "../store/selectors/field.selectors";
import {connect} from "react-redux";
import {FieldComponent} from "./Field.component";
import {gameSettingsSelector} from "../store/selectors/settings.selector";

const mapStateToProps = (state: IState) => {
    return {
        nodesIds: nodeIdsSelector(state),
        fieldSize: gameSettingsSelector(state).fieldSize,
    }
};

const mapDispatchToProps = {  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldComponent)
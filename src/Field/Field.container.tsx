import {IState} from "../store/state";
import {nodeIdsSelector} from "../selectors/field.selectors";
import {connect} from "react-redux";
import {FieldComponent} from "./Field.component";
import {gameSettingsSelector, renderingSettingsSelector} from "../selectors/settings.selector";

const mapStateToProps = (state: IState) => {
    return {
        nodesIds: nodeIdsSelector(state),
        fieldSize: gameSettingsSelector(state).fieldSize,
        nodeSize: renderingSettingsSelector(state).nodeSize
    }
};

const mapDispatchToProps = {  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldComponent)
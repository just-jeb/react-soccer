import {IState} from "../store/state";
import {nodeIdsSelector} from "../selectors/field.selectors";
import {connect} from "react-redux";
import {FieldComponent} from "./Field.component";
import {fieldSettingsSelector, nodeSettingsSelector} from "../selectors/settings.selector";

const mapStateToProps = (state: IState) => {
    return {
        nodesIds: nodeIdsSelector(state),
        fieldSize: fieldSettingsSelector(state).size,
        nodeSize: nodeSettingsSelector(state).size
    }
};

const mapDispatchToProps = {  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldComponent)
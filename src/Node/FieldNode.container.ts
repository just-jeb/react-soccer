import {nodeSelector} from "../selectors/field.selectors";
import {IState} from "../store/state";
import {nodeSettingsSelector} from "../selectors/settings.selector";
import {connect} from "react-redux";
import {FieldNodeComponent} from "./FieldNode.component";

const mapStateToProps = (state: IState, props: { id: string }) => ({
    node: nodeSelector(state, props),
    dotRadus: nodeSettingsSelector(state).dotRadius
});

export default connect(
    mapStateToProps,
)(FieldNodeComponent)
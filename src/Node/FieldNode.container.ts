import {nodeSelector} from "../selectors/field.selectors";
import {IState} from "../store/state";
import {renderingSettingsSelector} from "../selectors/settings.selector";
import {connect} from "react-redux";
import {FieldNodeComponent} from "./FieldNode.component";
import {ballNodeSelector} from "../selectors/game.selectors";

const mapStateToProps = (state: IState, props: { id: string }) => ({
    node: nodeSelector(state, props),
    isBallNode: ballNodeSelector(state) === props.id,
    nodeSize: renderingSettingsSelector(state).nodeSize,
    boosterRadius: renderingSettingsSelector(state).boosterRadius,
});

export default connect(
    mapStateToProps,
)(FieldNodeComponent)
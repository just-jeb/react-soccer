import {nodeSelector} from "../store/selectors/field.selectors";
import {IState} from "../store/state";
import {connect} from "react-redux";
import {FieldNodeComponent} from "./FieldNode.component";
import {ballNodeSelector, boosterSelector} from "../store/selectors/game.selectors";
import {ThunkDispatch} from "redux-thunk";
import {GameActions} from "../store/actions/game.actions";

const mapStateToProps = (state: IState, props: { id: string }) => ({
    node: nodeSelector(state, props),
    isBallNode: ballNodeSelector(state) === props.id,
    booster: boosterSelector(state, props),
});

export default connect(
    mapStateToProps,
)(FieldNodeComponent)
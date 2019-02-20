import {nodeSelector} from "../selectors/field.selectors";
import {IState} from "../store/state";
import {connect} from "react-redux";
import {FieldNodeComponent} from "./FieldNode.component";
import {ballNodeSelector, boosterSelector} from "../selectors/game.selectors";
import {ThunkDispatch} from "redux-thunk";
import {GameActions} from "../actions/game.actions";

const mapStateToProps = (state: IState, props: { id: string }) => ({
    node: nodeSelector(state, props),
    isBallNode: ballNodeSelector(state) === props.id,
    booster: boosterSelector(state, props)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, GameActions>, props: { id: string }) => ({
    onClick: () => dispatch(GameActions.makeMove(props.id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldNodeComponent)
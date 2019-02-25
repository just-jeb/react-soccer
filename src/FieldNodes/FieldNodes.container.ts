import {connect} from "react-redux";
import {FieldNodesComponent} from "./FieldNodes.component";
import {IState} from "../store/state";
import {nodesListSelector} from "../store/selectors/field.selectors";
import {boostersSelector} from "../store/selectors/game.selectors";

const mapStateToProps = (state: IState) => ({
    nodes: nodesListSelector(state),
    boosters: boostersSelector(state)
});

export default connect(
    mapStateToProps
)(FieldNodesComponent)
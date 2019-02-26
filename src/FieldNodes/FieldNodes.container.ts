import {connect} from "react-redux";
import {FieldNodesComponent} from "./FieldNodes.component";
import {IState} from "../store/state";
import {boostersSelector, nodesListSelector} from "../store/selectors/field.selectors";

const mapStateToProps = (state: IState) => ({
  nodes: nodesListSelector(state),
  boosters: boostersSelector(state)
});

export default connect(
  mapStateToProps
)(FieldNodesComponent)
import {IState} from "../store/state";
import {ballPositionSelector} from "../store/selectors/field.selectors";
import {connect} from "react-redux";
import {BallComponent} from "./Ball.component";

const mapStateToProps = (state: IState) => ({
  ballPosition: ballPositionSelector(state)
});

export default connect(
  mapStateToProps
)(BallComponent)
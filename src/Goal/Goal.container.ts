import {IState} from "../store/state";
import {nodesByIdsSelector, playerColorSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {GoalComponent} from "./Goal.component";
import {IGoal} from "../types/game.types";

const mapStateToProps = (state: IState, props: { goal: IGoal }) => ({
    goalNodes: nodesByIdsSelector(state)(props.goal.nodes),
    goalColor: playerColorSelector(state)(props.goal.owner)
});

export default connect(
    mapStateToProps
)(GoalComponent)
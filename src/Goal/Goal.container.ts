import {IState} from "../store/state";
import {playerColorSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {GoalComponent} from "./Goal.component";
import {IGoal} from "../types/field.types";
import {nodesByIdsSelector} from "../store/selectors/field.selectors";

const mapStateToProps = (state: IState, props: { goal: IGoal }) => ({
    goalNodes: nodesByIdsSelector(state)(props.goal.nodes),
    goalColor: playerColorSelector(state)(props.goal.owner)
});

export default connect(
    mapStateToProps
)(GoalComponent)
import {IState} from "../store/state";
import {gateNodesSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {GateComponent} from "./Gate.component";
import {EPlayers} from "../types/game.types";

const mapStateToProps = (state: IState, props: { player: EPlayers }) => ({
    gateNodes: gateNodesSelector(state)(props.player)
});

export default connect(
    mapStateToProps
)(GateComponent)
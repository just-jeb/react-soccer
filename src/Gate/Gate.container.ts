import {IState} from "../store/state";
import {gateNodesSelector} from "../store/selectors/game.selectors";
import {connect} from "react-redux";
import {GateComponent} from "./Gate.component";
import {IPlayer} from "../types/game.types";

const mapStateToProps = (state: IState, props: { player: IPlayer }) => ({
    gateNodes: gateNodesSelector(state)(props.player.id),
    playerColor: props.player.color
});

export default connect(
    mapStateToProps
)(GateComponent)
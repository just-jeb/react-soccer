import {IState} from "../store/state";
import {connect} from "react-redux";
import {GameComponent} from "./Game.component";
import {gameIdSelector} from "../store/selectors/game.selectors";
import {saveGame} from "../store/actions/meta-game.actions";

//TODO: unite with StartGameComponent
const mapStateToProps = (state: IState) => ({
    gameId: gameIdSelector(state)
});

export default connect(
    mapStateToProps,
    {saveGame}
)(GameComponent);
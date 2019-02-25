import {loadGame} from "../store/actions/meta-game.actions";
import {connect} from "react-redux";
import {StartGameComponent} from "./StartGame.component";
import {startNewGame} from "../store/actions/game.actions";

export default connect(
    null,
    {
        loadGame, startNewGame
    }
)(StartGameComponent);
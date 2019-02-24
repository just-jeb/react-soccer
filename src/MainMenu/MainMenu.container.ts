import {IState} from "../store/state";
import {ThunkDispatch} from "redux-thunk";
import {GameActions} from "../store/actions/game.actions";
import {connect} from "react-redux";
import {MainMenuComponent} from "./MainMenu.component";

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, GameActions>) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenuComponent);
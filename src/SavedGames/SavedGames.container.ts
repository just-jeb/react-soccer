import {IState} from "../store/state";
import {savedGamesListSelector} from "../store/selectors/meta-info.selectors";
import {connect} from "react-redux";
import {SavedGamesComponent} from "./SavedGames.component";
import {ThunkDispatch} from "redux-thunk";
import {MetaGameActions} from "../store/actions/meta-game.actions";
import {fetchSavedGameHeaders} from '../store/thunks/meta-game.thunks';

export const mapStateToProps = (state: IState) => ({
  savedGames: savedGamesListSelector(state)
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, any, MetaGameActions>) => ({
  loadGamesList: () => dispatch(fetchSavedGameHeaders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedGamesComponent);
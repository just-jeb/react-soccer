import {createSelector} from "reselect";
import {IState} from "../state";

export const metaInfoSelector = (state: IState) => state.metaInfo;
export const savedGamesSelector = (state: IState) => metaInfoSelector(state).savedGames;
export const savedGamesListSelector = createSelector(
  savedGamesSelector,
  savedGames => Object.values(savedGames)
);
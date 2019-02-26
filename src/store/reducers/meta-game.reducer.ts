import {Reducer} from "redux";
import {EMetaGameActionsTypes, MetaGameActions} from "../actions/meta-game.actions";
import {IMetaInfo} from "../../types/meta-game.types";
import {extractSavedGameHeader} from "../../utils/meta-game.utils";

const defaultMetaState: IMetaInfo = {
  savedGames: {}
};

export const metaInfo: Reducer<IMetaInfo, MetaGameActions> = (state = defaultMetaState, action) => {
  switch (action.type) {
    case EMetaGameActionsTypes.SAVE_GAME:
      const header = extractSavedGameHeader(action.payload);
      return {...state, [header.id]: header};
    case EMetaGameActionsTypes.SET_SAVED_GAMES_HEADERS:
      return {...state, savedGames: action.payload};
    default:
      return state;
  }
};
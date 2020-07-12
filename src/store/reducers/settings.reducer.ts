import { Reducer } from 'redux';
import { IGameSettings } from '../../types/settings.types';
import {
  ESettingsActionsTypes,
  SettingsActions,
} from '../actions/settings.actions';
import {
  EMetaGameActionsTypes,
  MetaGameActions,
} from '../actions/meta-game.actions';

const defaultGameSettings: IGameSettings = {
  fieldSize: { width: 11, height: 7 },
};

export const gameSettings: Reducer<
  IGameSettings,
  SettingsActions | MetaGameActions
> = (state = defaultGameSettings, action) => {
  switch (action.type) {
    case ESettingsActionsTypes.SET_GAME_FIELD_SIZE:
      return { ...state, size: action.payload };
    case EMetaGameActionsTypes.LOAD_GAME:
      return action.payload.settings;
    default:
      return state;
  }
};

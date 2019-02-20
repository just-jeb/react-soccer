import {Reducer} from "redux";
import {IGameSettings} from "../../types/settings.types";
import {SettingsActions, SettingsActionsTypes} from "../actions/settings.actions";

const defaultGameSettings: IGameSettings = {fieldSize: {width: 15, height: 7}};

export const gameSettings: Reducer<IGameSettings, SettingsActions> = (state = defaultGameSettings, action) => {
    switch (action.type) {
        case SettingsActionsTypes.SET_GAME_FIELD_SIZE:
            return {...state, size: action.payload};
        default:
            return state;
    }
};

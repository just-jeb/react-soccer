import {Reducer} from "redux";
import {IGameSettings, IRenderingSettings} from "../types/settings.types";
import {SettingsActions, SettingsActionsTypes} from "../actions/settings.actions";

const defaultGameSettings: IGameSettings = {fieldSize: {width: 15, height: 7}};
const defaultRenderingSettings: IRenderingSettings = {nodeSize: {width: 50, height: 50}, boosterRadius: 5};

export const gameSettings: Reducer<IGameSettings, SettingsActions> = (state = defaultGameSettings, action) => {
    switch (action.type) {
        case SettingsActionsTypes.SET_GAME_FIELD_SIZE:
            return {...state, size: action.payload};
        default:
            return state;
    }
};

export const renderingSettings: Reducer<IRenderingSettings> = (state = defaultRenderingSettings, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
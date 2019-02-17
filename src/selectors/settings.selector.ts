import {IState} from "../store/state";

export const gameSettingsSelector = (state: IState) => state.gameSettings;
export const renderingSettingsSelector = (state: IState) => state.renderingSettings;
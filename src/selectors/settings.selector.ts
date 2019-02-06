import {IState} from "../store/state";

export const settingsSelector = (state: IState) => state.settings;
export const fieldSettingsSelector = (state: IState) => {
    const settings = settingsSelector(state);
    return {size: settings.fieldSize};
};

export const nodeSettingsSelector = (state: IState) => {
    const settings = settingsSelector(state);
    return {size: settings.nodeSize, dotRadius: settings.dotRadius};
};
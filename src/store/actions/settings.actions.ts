import {IDimensions} from "../../types/common.types";
import {createAction} from "./utils";
import {ActionsUnion} from "./types";

export enum ESettingsActionsTypes {
    SET_GAME_FIELD_SIZE = '[setup] SET_GAME_FIELD_SIZE'
}


export const SettingsActions = {
    setGameFieldSize: (size: IDimensions) => createAction(ESettingsActionsTypes.SET_GAME_FIELD_SIZE, size)
};


export type SettingsActions = ActionsUnion<typeof SettingsActions>;
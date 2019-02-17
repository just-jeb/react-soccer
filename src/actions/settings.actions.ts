import {ISize} from "../types/common.types";
import {createAction} from "./utils";
import {ActionsUnion} from "./types";

export enum SettingsActionsTypes {
    SET_GAME_FIELD_SIZE = '[setup] SET_GAME_FIELD_SIZE'
}


export const SettingsActions = {
    setGameFieldSize: (size: ISize) => createAction(SettingsActionsTypes.SET_GAME_FIELD_SIZE, size)
};


export type SettingsActions = ActionsUnion<typeof SettingsActions>;
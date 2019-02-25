import {createAction} from "./utils";
import {ActionsUnion} from "./types";

export enum EFieldActionsTypes {
    MOVE_BALL = '[field] MOVE_BALL',
}


export const FieldActions = {
    moveBall: (nodeId: string) => createAction(EFieldActionsTypes.MOVE_BALL, {nodeId})
};


export type FieldActions = ActionsUnion<typeof FieldActions>;
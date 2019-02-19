import {INode} from "../types/field.types";
import {createAction} from "./utils";
import {ActionsUnion} from "./types";

export enum FieldActionsTypes {
    CREATE_NODES = '[setup] CREATE_NODES',
}


export const FieldActions = {
    createNodes: (nodes: INode[]) => createAction(FieldActionsTypes.CREATE_NODES, nodes)
};


export type FieldActions = ActionsUnion<typeof FieldActions>;
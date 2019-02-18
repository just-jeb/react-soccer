import {Dispatch} from "redux";
import {INode} from "../types/field.types";
import {createAction} from "./utils";
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector, renderingSettingsSelector} from "../selectors/settings.selector";
import {initializeCoordinatesTransformer} from "../utils/rendering.utils";

export const initializeGame: () => ReactSoccerThunkAction = () => (dispatch: Dispatch, getState) => {
    //TODO: move to appropriate place
    const {nodeSize: {width: nw, height: nh}} = renderingSettingsSelector(getState());
    initializeCoordinatesTransformer(nw,nh);

    const {width, height} = gameSettingsSelector(getState()).fieldSize;
    const nodes: INode[] = Array(width * height).fill(null).map((node, index) => ({
        coordinates: {x: (index % width), y: Math.floor(index / width)}
    }));
    dispatch(FieldActions.createNodes(nodes));
};

export enum FieldActionsTypes {
    CREATE_NODES = '[setup] CREATE_NODES',
}


export const FieldActions = {
    createNodes: (nodes: INode[]) => createAction(FieldActionsTypes.CREATE_NODES, nodes)
};


export type FieldActions = ActionsUnion<typeof FieldActions>;
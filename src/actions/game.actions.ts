import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector} from "../selectors/settings.selector";
import {INode} from "../types/field.types";
import {FieldActions} from "./field.actions";
import {createAction} from "./utils";
import {getNodeId, isEdge, isMiddle} from "../utils/game.utils";
import {TBoosters} from "../types/game.types";

export const initializeGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const fieldSize = gameSettingsSelector(getState()).fieldSize;
    const {width, height} = fieldSize;

    const nodes: INode[] = Array(width * height).fill(null).map((node, index) => {
        const coordinates = {x: (index % width), y: Math.floor(index / width)};
        return {
            coordinates
        }
    });
    const defaultBoosters = nodes.reduce<TBoosters>((boosters, node) => {
        boosters[getNodeId(node)] = isEdge(node.coordinates, fieldSize) || isMiddle(node.coordinates, fieldSize);
        return boosters;
    }, {});
    const centerNodeId = getNodeId(nodes[Math.floor(nodes.length / 2)]);
    dispatch(FieldActions.createNodes(nodes));
    dispatch(GameActions.startNewGame(centerNodeId, defaultBoosters));
};


export enum EGameActionsTypes {
    MAKE_MOVE = '[game] MAKE_MOVE',
    START_NEW_GAME = '[game] START_NEW_GAME'
}


export const GameActions = {
    makeMove: (nodeId: string) => createAction(EGameActionsTypes.MAKE_MOVE, nodeId),
    startNewGame: (startNodeId: string, defaultBoosters: TBoosters) => createAction(EGameActionsTypes.START_NEW_GAME,
        {startNodeId, defaultBoosters}
    )
};


export type GameActions = ActionsUnion<typeof GameActions>;
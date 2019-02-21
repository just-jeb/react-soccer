import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector} from "../selectors/settings.selector";
import {INode} from "../../types/field.types";
import {FieldActions} from "./field.actions";
import {createAction} from "./utils";
import {isEdge, isMiddle} from "../../utils/field.utils";
import {EPlayers, IGate, TBoosters} from "../../types/game.types";
import {stringifyPoint} from "../../utils/common.utils";
import {IDimensions} from "../../types/common.types";


const createNodes = ({width, height}: IDimensions): INode[] => {
    return Array(width * height).fill(null).map((node, index) => {
        const coordinates = {x: (index % width), y: Math.floor(index / width)};
        const id = stringifyPoint(coordinates);
        return {
            id,
            coordinates
        }
    });
};


const createGates = ({width, height}: IDimensions, nodes: INode[]): IGate[] => {
    const midY = Math.floor(height / 2);
    const gatesYCoord = [midY - 1, midY, midY + 1];
    const mapGatesYCoordsToNodes = (transformFunction: (y: number) => number) =>
        gatesYCoord.map(transformFunction).map(i => nodes[i].id);

    return [
        {
            owner: EPlayers.PLAYER1,
            nodes: mapGatesYCoordsToNodes(y => y * width)
        },
        {
            owner: EPlayers.PLAYER2,
            nodes: mapGatesYCoordsToNodes(y => (y + 1) * width - 1)
        }
    ];
};

const identifyDefaultBoosters = (fieldSize: IDimensions, nodes: INode[], gates: IGate[]) => {
    return nodes.reduce<TBoosters>((boosters, node) => {
        const isBooster = !gates.some(g => g.nodes.includes(node.id)) &&
            (isEdge(fieldSize)(node.coordinates) || isMiddle(fieldSize)(node.coordinates));
        return {...boosters, [node.id]: isBooster};
    }, {});
};

export const initializeGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const fieldSize = gameSettingsSelector(getState()).fieldSize;
    const nodes = createNodes(fieldSize);
    const gates = createGates(fieldSize, nodes);
    const defaultBoosters = identifyDefaultBoosters(fieldSize, nodes, gates);
    const centerNodeId = nodes[Math.floor(nodes.length / 2)].id;
    dispatch(FieldActions.createNodes(nodes));
    dispatch(GameActions.startNewGame(centerNodeId, defaultBoosters, gates));
};


export enum EGameActionsTypes {
    MAKE_MOVE = '[game] MAKE_MOVE',
    START_NEW_GAME = '[game] START_NEW_GAME'
}


export const GameActions = {
    makeMove: (nodeId: string) => createAction(EGameActionsTypes.MAKE_MOVE, nodeId),
    startNewGame: (startNodeId: string, defaultBoosters: TBoosters, gates: IGate[]) =>
        createAction(EGameActionsTypes.START_NEW_GAME,{startNodeId, defaultBoosters, gates})
};


export type GameActions = ActionsUnion<typeof GameActions>;
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector} from "../selectors/settings.selector";
import {INode} from "../../types/field.types";
import {FieldActions} from "./field.actions";
import {createAction} from "./utils";
import {isEdge, isMiddle} from "../../utils/field.utils";
import {IGate, IPlayer, TBoosters} from "../../types/game.types";
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


const createGates = ({width, height}: IDimensions, nodes: INode[], [p1,p2]: IPlayer[]): IGate[] => {
    const midY = Math.floor(height / 2);
    const gatesYCoord = [midY - 1, midY, midY + 1];
    const mapGatesYCoordsToNodes = (transformFunction: (y: number) => number) =>
        gatesYCoord.map(transformFunction).map(i => nodes[i].id);

    return [
        {
            owner: p1.id,
            nodes: mapGatesYCoordsToNodes(y => y * width)
        },
        {
            owner: p2.id,
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
    const players: IPlayer[] = [{id: '1', name: 'Jenia', color: 'purple'}, {id: '2', name: 'Eyal', color: 'orange'}];
    const gates = createGates(fieldSize, nodes, players);
    const defaultBoosters = identifyDefaultBoosters(fieldSize, nodes, gates);
    const centerNodeId = nodes[Math.floor(nodes.length / 2)].id;
    dispatch(FieldActions.createNodes(nodes));
    dispatch(GameActions.startNewGame(centerNodeId, defaultBoosters, gates, players));
};


export enum EGameActionsTypes {
    MAKE_MOVE = '[game] MAKE_MOVE',
    START_NEW_GAME = '[game] START_NEW_GAME'
}


export const GameActions = {
    makeMove: (nodeId: string) => createAction(EGameActionsTypes.MAKE_MOVE, nodeId),
    startNewGame: (startNodeId: string, defaultBoosters: TBoosters, gates: IGate[], players: IPlayer[]) =>
        createAction(EGameActionsTypes.START_NEW_GAME,{startNodeId, defaultBoosters, gates, players})
};


export type GameActions = ActionsUnion<typeof GameActions>;
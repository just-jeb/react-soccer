import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector, renderingSettingsSelector} from "../selectors/settings.selector";
import {initializeCoordinatesTransformer} from "../utils/rendering.utils";
import {INode} from "../types/field.types";
import {FieldActions} from "./field.actions";
import {createAction} from "./utils";
import {nodeSelector} from "../selectors/field.selectors";
import {getNodeId, isEdge, isMiddle} from "../utils/game.utils";
import {currentPlayerSelector} from "../selectors/game.selectors";
import {EGameStatus, EPlayers} from "../types/game.types";

export const initializeGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const {nodeSize: {width: nw, height: nh}} = renderingSettingsSelector(getState());
    initializeCoordinatesTransformer(nw, nh);
    const fieldSize = gameSettingsSelector(getState()).fieldSize;
    const {width, height} = fieldSize;
    const nodes: INode[] = Array(width * height).fill(null).map((node, index) => {
        const coordinates = {x: (index % width), y: Math.floor(index / width)};
        const booster = isEdge(coordinates, fieldSize) || isMiddle(coordinates, fieldSize);
        return {
            coordinates,
            booster
        }
    });
    const centerNodeId = getNodeId(nodes[Math.floor(nodes.length / 2)]);
    dispatch(FieldActions.createNodes(nodes));
    dispatch(GameActions.setBallNode(centerNodeId));
    dispatch(GameActions.setCurrentPlayer(EPlayers.PLAYER1));
    dispatch(GameActions.setGameStatus(EGameStatus.Playing));
};

export const makeMove: (toNode: string) => ReactSoccerThunkAction =
    (toNode: string) => (dispatch, getState) => {
        const node = nodeSelector(getState(), {id: toNode});
        dispatch(GameActions.setBallNode(toNode));
        if (!node.booster) {
            dispatch(finishTurn())
        }
    };

export const finishTurn: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const nextPlayer = currentPlayerSelector(getState()) === EPlayers.PLAYER1 ? EPlayers.PLAYER2 : EPlayers.PLAYER1;
    dispatch(GameActions.setCurrentPlayer(nextPlayer));
};


export enum EGameActionsTypes {
    SET_GAME_STATUS = '[game] SET_GAME_STATUS',
    SET_CURRENT_PLAYER = '[game] SET_CURRENT_PLAYER',
    SET_BALL_NODE = '[game] SET_BALL_NODE',
}


export const GameActions = {
    setBallNode: (nodeId: string) => createAction(EGameActionsTypes.SET_BALL_NODE, nodeId),
    setCurrentPlayer: (player: EPlayers) => createAction(EGameActionsTypes.SET_CURRENT_PLAYER, player),
    setGameStatus: (status: EGameStatus) => createAction(EGameActionsTypes.SET_GAME_STATUS, status)
};


export type GameActions = ActionsUnion<typeof GameActions>;
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {gameSettingsSelector} from "../selectors/settings.selector";
import {FieldActions} from "./field.actions";
import {createAction} from "./utils";
import {IGate, IPlayer, TBoosters} from "../../types/game.types";
import {createGates, createNodes, createFieldBoosters} from "../../utils/game.utils";


export const startNewGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const fieldSize = gameSettingsSelector(getState()).fieldSize;
    const nodes = createNodes(fieldSize);
    const players: IPlayer[] = [{id: '1', name: 'Jenia', color: 'purple'}, {id: '2', name: 'Eyal', color: 'orange'}];
    const gates = createGates(fieldSize, nodes, players);
    const defaultBoosters = createFieldBoosters(fieldSize, nodes, gates);
    const startNodeId = nodes[Math.floor(nodes.length / 2)].id;

    //TODO: Consider uniting FieldActions and GameActions
    dispatch(FieldActions.createNodes(nodes));
    dispatch(GameActions.startNewGame(startNodeId, defaultBoosters, gates, players));
};


export enum EGameActionsTypes {
    MAKE_MOVE = '[game] MAKE_MOVE',
    START_GAME = '[game] START_GAME'
}


export const GameActions = {
    makeMove: (nodeId: string) => createAction(EGameActionsTypes.MAKE_MOVE, nodeId),
    startNewGame: (startNodeId: string, defaultBoosters: TBoosters, gates: IGate[], players: IPlayer[]) =>
        createAction(EGameActionsTypes.START_GAME,{startNodeId, defaultBoosters, gates, players})
};


export type GameActions = ActionsUnion<typeof GameActions>;
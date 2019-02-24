import {Reducer} from "redux";
import {EGameStatus, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {reduceToDictionary, uuid} from "../../utils/common.utils";
import {determineGameStatus, determineNextPlayer} from "../../utils/game.utils";
import {EMetaGameActionsTypes, MetaGameActions} from "../actions/meta-game.actions";

//TODO: find a way to deal with empty state (the default one)
const defaultGameState: IGame = {
    id: '',
    currentPlayer: '',
    ballNode: '',
    gameStatus: EGameStatus.NotStarted,
    path: [],
    boosters: {},
    gates: {},
    players: []
};


export const gameState: Reducer<IGame, GameActions | MetaGameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.START_GAME:
            const {startNodeId, defaultBoosters, gates, players} = action.payload;
            return {
                id: uuid(),
                currentPlayer: players[0].id,
                ballNode: startNodeId,
                gameStatus: EGameStatus.Playing,
                path: [],
                boosters: defaultBoosters,
                gates: reduceToDictionary(gates, 'owner'),
                players: players
            };
        case EMetaGameActionsTypes.LOAD_GAME:
            return action.payload.game;
        case EGameActionsTypes.MAKE_MOVE:
            const newBallNode = action.payload;
            const {ballNode, currentPlayer, path, boosters} = state;
            const connection: TConnection = [ballNode, newBallNode];

            let nextPlayer = determineNextPlayer(state, newBallNode);
            let gameStatus = determineGameStatus(state, newBallNode);
            //TODO: win case for the second player when no moves left for the current one
            const winner = gameStatus === EGameStatus.EndWin ? currentPlayer : undefined;
            return {
                ...state,
                currentPlayer: nextPlayer,
                ballNode: newBallNode,
                path: [...path, connection],
                boosters: {...boosters, [newBallNode]: true},
                gameStatus,
                winner
            };
        default:
            return state;
    }
};
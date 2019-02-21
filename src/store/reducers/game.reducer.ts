import {Reducer} from "redux";
import {EGameStatus, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {reduceToDictionary} from "../../utils/common.utils";
import {determineGameStatus, determineNextPlayer} from "../../utils/game.utils";

//TODO: find a way to deal with empty state (the default one)
const defaultGameState: IGame = {
    currentPlayer: '',
    ballNode: '',
    gameStatus: EGameStatus.NotStarted,
    path: [],
    boosters: {},
    gates: {},
    players: []
};

export const gameState: Reducer<IGame, GameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.START_NEW_GAME:
            const {startNodeId, defaultBoosters, gates, players} = action.payload;
            return {
                currentPlayer: players[0].id,
                ballNode: startNodeId,
                gameStatus: EGameStatus.Playing,
                path: [],
                boosters: defaultBoosters,
                gates: reduceToDictionary(gates, 'owner'),
                players: players
            };
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
import {Reducer} from "redux";
import {EGameStatus, EPlayers, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {reduceToDictionary} from "../../utils/common.utils";
import {determineGameStatus, determineNextPlayer} from "../../utils/game.utils";

//TODO: find a way to deal with empty state (the default one)
const defaultGameState: IGame = {
    currentPlayer: EPlayers.PLAYER1,
    ballNode: '',
    gameStatus: EGameStatus.NotStarted,
    path: [],
    boosters: {},
    gates: {
        [EPlayers.PLAYER1]: {
            nodes: [],
            owner: EPlayers.PLAYER1
        },
        [EPlayers.PLAYER2]: {
            nodes: [],
            owner: EPlayers.PLAYER2
        }
    },
};

export const gameState: Reducer<IGame, GameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.START_NEW_GAME:
            const {startNodeId, defaultBoosters, gates} = action.payload;
            return {
                currentPlayer: EPlayers.PLAYER1,
                ballNode: startNodeId,
                gameStatus: EGameStatus.Playing,
                path: [],
                boosters: defaultBoosters,
                gates: reduceToDictionary(gates, 'owner')
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
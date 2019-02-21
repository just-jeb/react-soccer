import {Reducer} from "redux";
import {EGameStatus, EPlayers, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {reduceToDictionary} from "../../utils/common.utils";

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
    }
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
            const connection: TConnection = [state.ballNode, newBallNode];
            let nextPlayer = state.currentPlayer;
            if (!state.boosters[newBallNode]) {
                nextPlayer = state.currentPlayer === EPlayers.PLAYER1 ? EPlayers.PLAYER2 : EPlayers.PLAYER1;
            }
            return {
                ...state,
                currentPlayer: nextPlayer,
                ballNode: newBallNode,
                path: [...state.path, connection],
                boosters: {...state.boosters, [newBallNode]: true},
            };
        default:
            return state;
    }
};
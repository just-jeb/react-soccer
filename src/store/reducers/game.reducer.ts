import {Reducer} from "redux";
import {EGameStatus, EPlayers, IGame, TConnection} from "../../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";

const defaultGameState: IGame = {
    currentPlayer: EPlayers.PLAYER1,
    ballNode: '',
    gameStatus: EGameStatus.NotStarted,
    path: [],
    boosters: {}
};

export const gameState: Reducer<IGame, GameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.START_NEW_GAME:
            const {startNodeId, defaultBoosters} = action.payload;
            return {
                currentPlayer: EPlayers.PLAYER1,
                ballNode: startNodeId,
                gameStatus: EGameStatus.Playing,
                path: [],
                boosters: defaultBoosters
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
                boosters: {...state.boosters, [newBallNode]: true}
            };
        default:
            return state;
    }
};
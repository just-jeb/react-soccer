import {Reducer} from "redux";
import {EGameStatus, EPlayers, IGame} from "../types/game.types";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";

const defaultGameState: IGame = {
    currentPlayer: EPlayers.PLAYER1,
    ballNode: '',
    gameStatus: EGameStatus.NotStarted
};

export const gameState: Reducer<IGame, GameActions> = (state = defaultGameState, action) => {
    switch (action.type) {
        case EGameActionsTypes.SET_BALL_NODE:
            return {...state, ballNode: action.payload};
        case EGameActionsTypes.SET_CURRENT_PLAYER:
            return {...state, currentPlayer: action.payload};
        case EGameActionsTypes.SET_GAME_STATUS:
            return {...state, gameStatus: action.payload};
        default:
            return state;
    }
};
import {IState} from "../store/state";

export const gameStateSelector = (state: IState) => state.gameState;
export const gameStatusSelector = (state: IState) => gameStateSelector(state).gameStatus;
export const ballNodeSelector = (state: IState) => gameStateSelector(state).ballNode;
export const currentPlayerSelector = (state: IState) => gameStateSelector(state).currentPlayer;
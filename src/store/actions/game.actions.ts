import {ActionsUnion} from './types';
import {createAction} from './utils';
import {EGameStatus} from '../../types';


export enum EGameActionsTypes {
  UPDATE_GAME_STATE = '[game] MAKE_MOVE'
}


export const GameActions = {
  updateGameState: (gameStatus: EGameStatus, currentPlayer: string) =>
    createAction(EGameActionsTypes.UPDATE_GAME_STATE, {gameStatus, currentPlayer}),
};


export type GameActions = ActionsUnion<typeof GameActions>;
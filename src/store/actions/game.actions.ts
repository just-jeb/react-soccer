import { ActionsUnion } from './types';
import { createAction } from './utils';

export enum EGameActionsTypes {
  UPDATE_GAME_STATE = '[game] MAKE_MOVE',
}

export const GameActions = {
  updateGameState: (looser: string | null, currentPlayer: string) =>
    createAction(EGameActionsTypes.UPDATE_GAME_STATE, {
      looser,
      currentPlayer,
    }),
};

export type GameActions = ActionsUnion<typeof GameActions>;

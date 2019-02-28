import {createAction} from './utils';
import {ActionsUnion} from './types';
import {Dictionary, IGoal, INode, IPlayer, ISavedGame, ISavedGameHeader, TBoosters} from '../../types';

export enum EMetaGameActionsTypes {
  START_GAME = '[meta] START_GAME',
  LOAD_GAME = '[meta] LOAD_GAME',
  SAVE_GAME = '[meta] SAVE_GAME',
  SET_SAVED_GAMES_HEADERS = '[meta] SET_SAVED_GAMES_HEADERS'
}

export const MetaGameActions = {
  startNewGame: (startNodeId: string, defaultBoosters: TBoosters, goals: IGoal[], players: IPlayer[], nodes: INode[]) =>
    createAction(EMetaGameActionsTypes.START_GAME, {startNodeId, defaultBoosters, goals, players, nodes}),
  loadGame: (game: ISavedGame) => createAction(EMetaGameActionsTypes.LOAD_GAME, game),
  saveGame: (game: ISavedGame) => createAction(EMetaGameActionsTypes.SAVE_GAME, game),
  setSavedGamesHeaders: (headers: Dictionary<ISavedGameHeader>) =>
    createAction(EMetaGameActionsTypes.SET_SAVED_GAMES_HEADERS, headers)
};

export type MetaGameActions = ActionsUnion<typeof MetaGameActions>;

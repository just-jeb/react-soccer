import {createAction} from "./utils";
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {ISavedGame, ISavedGameHeader} from '../../types';
import {extractSavedGameHeader} from "../../utils/meta-game.utils";
import {gameSettingsSelector} from "../selectors/settings.selector";
import {createFieldBoosters, createGoals, createNodes} from "../../utils/game.utils";
import {IPlayer} from '../../types';
import {IGoal, INode, TBoosters} from '../../types';
import {ELocalStorageKeys, loadFromLocalStorage, saveToLocalStorage} from "../../utils/local-storage.utils";
import {Dictionary} from '../../types';

export const startNewGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
  const fieldSize = gameSettingsSelector(getState()).fieldSize;
  const nodes = createNodes(fieldSize);
  const players: IPlayer[] = [{id: '1', name: 'Dima', color: 'teal'}, {id: '2', name: 'Jenia', color: 'red'}];
  const gates = createGoals(fieldSize, nodes, players);
  const defaultBoosters = createFieldBoosters(fieldSize, nodes, gates);
  const startNodeId = nodes[Math.floor(nodes.length / 2)].id;

  dispatch(MetaGameActions.startNewGame(startNodeId, defaultBoosters, gates, players, nodes));
};

export const loadGame: (id: string) => ReactSoccerThunkAction = id => (dispatch) => {
  let gameState;
  const lastGameId = loadFromLocalStorage<string>(ELocalStorageKeys.LAST_GAME_ID);
  if (lastGameId && lastGameId === id) {
    gameState = loadFromLocalStorage<ISavedGame>(ELocalStorageKeys.LAST_GAME);
  } else {
    const saves = loadFromLocalStorage<Dictionary<ISavedGame>>(ELocalStorageKeys.SAVES);
    gameState = saves && saves[id];
  }
  if (gameState) {
    dispatch(MetaGameActions.loadGame(gameState));
  }
};

export const saveGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
  const {fieldState, gameState, gameSettings} = getState();
  const gameToSave = {field: fieldState, game: gameState, settings: gameSettings, date: new Date().toLocaleString()};
  const saves = loadFromLocalStorage<Dictionary<ISavedGame>>(ELocalStorageKeys.SAVES) || {};
  saves[gameState.id] = gameToSave;
  saveToLocalStorage(saves, ELocalStorageKeys.SAVES);
  dispatch(MetaGameActions.saveGame(gameToSave))
};

export const fetchSavedGameHeaders: () => ReactSoccerThunkAction = () => (dispatch) => {
  const savedGames = loadFromLocalStorage<Dictionary<ISavedGame>>(ELocalStorageKeys.SAVES);
  if (savedGames) {
    const savedGamesHeaders = Object.keys(savedGames).reduce<Dictionary<ISavedGameHeader>>((acc, key) => {
      const header = extractSavedGameHeader(savedGames[key]);
      acc[header.id] = header;
      return acc;
    }, {});
    dispatch(MetaGameActions.setSavedGamesHeaders(savedGamesHeaders));
  }
};

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

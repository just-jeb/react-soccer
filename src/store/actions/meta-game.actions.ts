import {createAction} from "./utils";
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {ISavedGame, TSavedGamesHeaders} from "../../types/meta-game.types";
import {extractSavedGameHeader} from "../../utils/meta-game.utils";

const LOCAL_STORAGE_KEY = 'react-soccer-saves';

export const loadGame: (id: string) => ReactSoccerThunkAction = id => (dispatch, getState) => {
    const savedGamesString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedGames: { [id: string]: ISavedGame } = savedGamesString && JSON.parse(savedGamesString) || {};
    const gameState = savedGames[id];

    dispatch(MetaGameActions.loadGame(gameState));
};

export const saveGame: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const {fieldState, gameState, gameSettings} = getState();
    const savedGamesString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedGames: { [id: string]: ISavedGame } = savedGamesString && JSON.parse(savedGamesString) || {};
    const gameToSave = {field: fieldState, game: gameState, settings: gameSettings, date: new Date().toLocaleString()};
    savedGames[gameState.id] = gameToSave;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedGames));
    dispatch(MetaGameActions.saveGame(gameToSave))
};

export const fetchSavedGameHeaders: () => ReactSoccerThunkAction = () => (dispatch, getState) => {
    const savedGamesString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedGames: { [id: string]: ISavedGame } = savedGamesString && JSON.parse(savedGamesString) || {};
    const savedGamesHeaders = Object.keys(savedGames).reduce<TSavedGamesHeaders>((acc, key) => {
        const header = extractSavedGameHeader(savedGames[key]);
        acc[header.id] = header;
        return acc;
    }, {});
    dispatch(MetaGameActions.setSavedGamesHeaders(savedGamesHeaders));
};

export enum EMetaGameActionsTypes {
    LOAD_GAME = '[meta] LOAD_GAME',
    SAVE_GAME = '[meta] SAVE_GAME',
    SET_SAVED_GAMES_HEADERS = '[meta] SET_SAVED_GAMES_HEADERS'
}

export const MetaGameActions = {
    loadGame: (game: ISavedGame) => createAction(EMetaGameActionsTypes.LOAD_GAME, game),
    saveGame: (game: ISavedGame) => createAction(EMetaGameActionsTypes.SAVE_GAME, game),
    setSavedGamesHeaders: (headers: TSavedGamesHeaders) =>
        createAction(EMetaGameActionsTypes.SET_SAVED_GAMES_HEADERS, headers)
};

export type MetaGameActions = ActionsUnion<typeof MetaGameActions>;
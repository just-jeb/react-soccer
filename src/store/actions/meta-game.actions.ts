import {createAction} from "./utils";
import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {ISavedGame} from "../../types/meta-game.types";
import {gameStateSelector} from "../selectors/game.selectors";

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
    savedGames[gameState.id] = {field: fieldState, game: gameState, settings: gameSettings};
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedGames));

};

export enum EMetaGameActionsTypes {
    LOAD_GAME = '[meta] LOAD_GAME',
    SAVE_GAME = '[meta] SAVE_GAME'
}

export const MetaGameActions = {
    loadGame: (game: ISavedGame) => createAction(EMetaGameActionsTypes.LOAD_GAME, game)
}

export type MetaGameActions = ActionsUnion<typeof MetaGameActions>;
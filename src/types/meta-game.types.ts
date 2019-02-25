import {IGame, IPlayer} from "./game.types";
import {IField} from "./field.types";
import {IGameSettings} from "./settings.types";

export interface ISavedGame {
    readonly date: string;
    readonly game: IGame;
    readonly field: IField;
    readonly settings: IGameSettings;
}

export interface ISavedGameHeader {
    readonly id: string;
    readonly players: IPlayer[];
    readonly date: string;
}

export type TSavedGamesHeaders = {[id: string]: ISavedGameHeader};

export interface IMetaInfo {
    readonly savedGames: TSavedGamesHeaders;
}
import {IGame, IPlayer} from "./game.types";
import {IField} from "./field.types";
import {IGameSettings} from "./settings.types";
import {Dictionary} from "./common.types";

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

export interface IMetaInfo {
  readonly savedGames: Dictionary<ISavedGameHeader>;
}
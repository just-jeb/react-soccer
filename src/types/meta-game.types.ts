import {IGame} from "./game.types";
import {IField} from "./field.types";
import {IGameSettings} from "./settings.types";

export interface ISavedGame {
    game: IGame;
    field: IField;
    settings: IGameSettings;
}
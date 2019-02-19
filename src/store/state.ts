import {IField} from "../types/field.types";
import {IGameSettings, IRenderingSettings} from "../types/settings.types";
import {IGame} from "../types/game.types";

export interface IState {
    readonly fieldState: IField;
    readonly gameSettings: IGameSettings;
    readonly renderingSettings: IRenderingSettings;
    readonly gameState: IGame;
}


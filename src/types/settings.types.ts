import {ISize} from "./common.types";

export interface IGameSettings {
    fieldSize: ISize;
}

export interface IRenderingSettings {
    nodeSize: ISize;
    boosterRadius: number;
}
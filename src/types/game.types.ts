import {IPoint} from "./common.types";

export enum EGameStatus {
    NotStarted,
    Playing,
    EndWin,
    EndTie
}

export interface IPlayer {
    id: string;
    color: string;
    name: string;
}

export type TPlayers = {readonly [id: string]: IPlayer};

export interface IGame {
    readonly id: string;
    readonly players: IPlayer[]
    readonly ballNode: string,
    readonly currentPlayer: string,
    readonly gameStatus: EGameStatus,
    //Path is an ordered array of node pairs that describes path on the field
    //For now it would be sufficient to have just array of nodeIds (not pairs) as path is sequential,
    //but later on we might need this info for drawing certain connections in different colors
    readonly path: TConnection[];
    readonly boosters: TBoosters;
    readonly gates: TGates;
    readonly winner?: string;
}

export interface IGate {
    readonly nodes: string[];
    readonly owner: string;
}

export type TGates = {readonly [player: string]: IGate};

export type TConnection = [string, string];
export type TBoosters = { readonly [nodeId: string]: boolean };

export type TConnectionCoords = [IPoint, IPoint];
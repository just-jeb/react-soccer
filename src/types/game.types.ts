import {IPoint} from "./common.types";

export enum EPlayers {
    PLAYER1 = 'player1',
    PLAYER2 = 'player2'
}

export enum EGameStatus {
    NotStarted,
    Playing,
    EndWin,
    EndTie
}

export interface IGame {
    readonly ballNode: string,
    readonly currentPlayer: EPlayers,
    readonly gameStatus: EGameStatus,
    //Path is an ordered array of node pairs that describes path on the field
    //For now it would be sufficient to have just array of nodeIds (not pairs) as path is sequential,
    //but later on we might need this info for drawing certain connections in different colors
    readonly path: TConnection[];
    readonly boosters: TBoosters;
    readonly gates: TGates;
}

export interface IGate {
    readonly nodes: string[];
    readonly owner: EPlayers;
}

export type TGates = {readonly [player in EPlayers]: IGate};

export type TConnection = [string, string];
export type TBoosters = { readonly [nodeId: string]: boolean };

export type TConnectionCoords = [IPoint, IPoint];
import {INode} from "./field.types";

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
    readonly gameStatus: EGameStatus
}
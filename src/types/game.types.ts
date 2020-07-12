export enum EGameStatus {
  NotStarted,
  Playing,
  End,
}

export interface IPlayer {
  id: string;
  color: string;
  name: string;
  attackDirection: 'left' | 'right';
}

export interface IGame {
  readonly id: string;
  readonly players: IPlayer[];
  readonly currentPlayer: string;
  readonly gameStatus: EGameStatus;
  readonly looser?: string | null;
}

import { IState } from '../state';
import { createSelector, defaultMemoize as memoize } from 'reselect';
import {
  getCurrentPlayer,
  getGameId,
  getGameStatus,
  getLooser,
  getPlayers,
} from '../reducers/game.reducer';

export const gameStatusSelector = ({ gameState }: IState) =>
  getGameStatus(gameState);
export const gameIdSelector = ({ gameState }: IState) => getGameId(gameState);
export const currentPlayerIdSelector = ({ gameState }: IState) =>
  getCurrentPlayer(gameState);

export const playersSelector = ({ gameState }: IState) => getPlayers(gameState);

export const looserSelector = ({ gameState }: IState) => getLooser(gameState);

export const currentPlayerSelector = createSelector(
  currentPlayerIdSelector,
  playersSelector,
  (id, players) => players.find((p) => p.id === id),
);

export const currentPlayerColorSelector = createSelector(
  currentPlayerSelector,
  (player) => player?.color || 'black',
);

export const currentPlayerDirectionSelector = createSelector(
  currentPlayerSelector,
  (player) => player?.attackDirection || 'left',
);

export const playerColorSelector = createSelector(playersSelector, (players) =>
  memoize((playerId: string) => {
    const player = players.find((p) => p.id === playerId);
    return (player && player.color) || 'black';
  }),
);

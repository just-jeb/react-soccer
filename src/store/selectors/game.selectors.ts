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
export const currentPlayerSelector = ({ gameState }: IState) =>
  getCurrentPlayer(gameState);

export const playersSelector = ({ gameState }: IState) => getPlayers(gameState);

export const looserSelector = ({ gameState }: IState) => getLooser(gameState);

export const currentPlayerColorSelector = createSelector(
  currentPlayerSelector,
  playersSelector,
  (currentPlayer, players) => {
    const player = players.find(p => p.id === currentPlayer);
    return (player && player.color) || 'black';
  },
);

export const playerColorSelector = createSelector(playersSelector, players =>
  memoize((playerId: string) => {
    const player = players.find(p => p.id === playerId);
    return (player && player.color) || 'black';
  }),
);

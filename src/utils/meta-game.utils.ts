import { ISavedGame, ISavedGameHeader } from '../types/meta-game.types';

export const extractSavedGameHeader = (game: ISavedGame) => {
  const {
    game: { players, id },
    date,
  } = game;
  return { players, id, date } as ISavedGameHeader;
};

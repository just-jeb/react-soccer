import {Reducer} from "redux";
import {EGameStatus, IGame} from '../../types';
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {uuid} from "../../utils/common.utils";
import {EMetaGameActionsTypes, MetaGameActions} from "../actions/meta-game.actions";

const defaultGameState: IGame = {
  id: '',
  currentPlayer: '',
  gameStatus: EGameStatus.NotStarted,
  players: []
};

export const getCurrentPlayer = ({currentPlayer}: IGame) => currentPlayer;
export const getGameStatus = ({gameStatus}: IGame) => gameStatus;
export const getPlayers = ({players}: IGame) => players;
export const getGameId = ({id}: IGame) => id;
export const getLooser = ({looser}: IGame) => looser;

export const gameState: Reducer<IGame, GameActions | MetaGameActions> = (state = defaultGameState, action): IGame => {
  switch (action.type) {
    case EMetaGameActionsTypes.START_GAME:
      const {players} = action.payload;
      return {
        id: uuid(),
        currentPlayer: players[0].id,
        gameStatus: EGameStatus.Playing,
        players: players
      };
    case EMetaGameActionsTypes.LOAD_GAME:
      return action.payload.game;
    case EGameActionsTypes.UPDATE_GAME_STATE:
      const {looser, currentPlayer} = action.payload;
      const {gameStatus: currentGameStatus} = state;

      const gameStatus = looser ? EGameStatus.End : currentGameStatus;

      return {
        ...state,
        currentPlayer,
        gameStatus,
        looser
      };
    default:
      return state;
  }
};
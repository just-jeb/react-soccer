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


export const gameState: Reducer<IGame, GameActions | MetaGameActions> = (state = defaultGameState, action) => {
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
      const {gameStatus, currentPlayer} = action.payload;
      const {currentPlayer: previousPlayer} = state;

      //TODO: win case for the second player when no moves left for the current one
      const winner = gameStatus === EGameStatus.End ? previousPlayer : undefined;
      return {
        ...state,
        currentPlayer,
        gameStatus,
        winner
      };
    default:
      return state;
  }
};
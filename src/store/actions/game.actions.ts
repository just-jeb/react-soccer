import {ActionsUnion, ReactSoccerThunkAction} from "./types";
import {createAction} from "./utils";
import {EGameStatus} from "../../types/game.types";
import {determineGameStatus, determineNextPlayer} from "../../utils/game.utils";
import {boostersSelector, goalsSelector} from "../selectors/field.selectors";
import {currentPlayerSelector, gameStatusSelector, playersSelector} from "../selectors/game.selectors";
import {FieldActions} from "./field.actions";

export const makeMove: (newBallNode: string) => ReactSoccerThunkAction = newBallNode => (dispatch, getState) => {
  const state = getState();

  let nextPlayer = determineNextPlayer(
    boostersSelector(state),
    currentPlayerSelector(state),
    playersSelector(state),
    newBallNode
  );
  let gameStatus = determineGameStatus(
    goalsSelector(state),
    gameStatusSelector(state),
    newBallNode
  );
  dispatch(GameActions.updateGameState(gameStatus, nextPlayer));
  dispatch(FieldActions.moveBall(newBallNode));
};


export enum EGameActionsTypes {
  UPDATE_GAME_STATE = '[game] MAKE_MOVE'
}


export const GameActions = {
  updateGameState: (gameStatus: EGameStatus, currentPlayer: string) =>
    createAction(EGameActionsTypes.UPDATE_GAME_STATE, {gameStatus, currentPlayer}),
};


export type GameActions = ActionsUnion<typeof GameActions>;
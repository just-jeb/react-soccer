import { ReactSoccerThunkAction } from '../actions/types';
import { determineLooser, determineNextPlayer } from '../../utils/game.utils';
import {
  ballNodeSelector,
  boostersSelector,
  goalsSelector,
  possibleMovesSelector,
} from '../selectors/field.selectors';
import {
  currentPlayerSelector,
  playersSelector,
} from '../selectors/game.selectors';
import { FieldActions } from '../actions/field.actions';
import { GameActions } from '../actions/game.actions';

export const makeMove: (
  newBallNode: string,
) => ReactSoccerThunkAction = newBallNode => (dispatch, getState) => {
  dispatch(FieldActions.moveBall(newBallNode));

  //TODO: if no moves left the player can kick the ball out up to 5 (or whatever) nodes
  const state = getState();
  const currentPlayer = currentPlayerSelector(state);
  const currentBallNode = ballNodeSelector(state);

  let nextPlayer = determineNextPlayer(
    boostersSelector(state),
    currentPlayer,
    playersSelector(state),
    currentBallNode,
  );

  let looser = determineLooser(
    goalsSelector(state),
    possibleMovesSelector(state),
    currentBallNode,
    currentPlayer,
  );

  dispatch(GameActions.updateGameState(looser, nextPlayer));
};

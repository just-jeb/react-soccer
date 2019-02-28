import {ReactSoccerThunkAction} from '../actions/types';
import {determineGameStatus, determineNextPlayer} from '../../utils/game.utils';
import {boostersSelector, goalsSelector} from '../selectors/field.selectors';
import {currentPlayerSelector, gameStatusSelector, playersSelector} from '../selectors/game.selectors';
import {FieldActions} from '../actions/field.actions';
import {GameActions} from '../actions/game.actions';

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
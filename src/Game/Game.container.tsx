import React from 'react';
import {IState} from '../store/state';
import {connect} from 'react-redux';
import {GameComponent} from './Game.component';
import {gameIdSelector} from '../store/selectors/game.selectors';
import {loadGame, saveGame, startNewGame} from '../store/thunks/meta-game.thunks';
import {RouteComponentProps} from 'react-router';
import {store} from '../store/store';
import {ELocalStorageKeys, saveToLocalStorage} from '../utils/local-storage.utils';

export interface IProps extends RouteComponentProps<{ id?: string }> {
  loadGame: (id: string) => void,
  startNewGame: () => void,
  saveGame: () => void,
  gameId?: string
}

const persistCurrentGame = () => {
  const {fieldState, gameState, gameSettings} = store.getState();
  const gameToSave = {field: fieldState, game: gameState, settings: gameSettings};
  saveToLocalStorage(gameToSave, ELocalStorageKeys.LAST_GAME);
  saveToLocalStorage(gameState.id, ELocalStorageKeys.LAST_GAME_ID);
};

export class GameContainer extends React.PureComponent<IProps> {
  componentDidMount(): void {
    const {match: {params: {id}}, loadGame, startNewGame} = this.props;
    if (id) {
      loadGame(id);
    } else {
      startNewGame();
    }
    store.subscribe(() => persistCurrentGame())
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const {gameId, match: {params: {id}}, location: {pathname}, history} = this.props;
    if (gameId && !id) {
      history.replace(`${pathname}/${gameId}`);
    }
  }

  render() {
    const {gameId, saveGame} = this.props;
    if (!gameId) {
      return null;
    }
    return <GameComponent saveGame={saveGame}/>;
  }
}


const mapStateToProps = (state: IState) => ({
  gameId: gameIdSelector(state)
});

export const ConnectedGameContainer = connect(
  mapStateToProps,
  {saveGame, loadGame, startNewGame}
)(GameContainer);
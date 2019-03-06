import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';

import {ConnectedGameContainer, GameContainer, IProps} from './Game.container';
import {saveToLocalStorage} from '../utils/local-storage.utils';
import {store} from '../store/store';

jest.mock('../utils/local-storage.utils');
jest.mock('../store/store', () => {
  return {
    store: {
      subscribe: jest.fn(),
      getState: jest.fn()
    }
  }
});
jest.mock('../store/thunks/meta-game.thunks');
jest.mock('react-redux', () => ({connect: (mstp: any, mdtp: any) => (comp: any) => ({mstp, mdtp, comp})}));


export class GameContainerDriver {
  wrapper!: ShallowWrapper;
  saveToLocalStorageMock = jest.fn();
  storeSubscriber!: () => void;
  triggerStoreSubscribe!: () => void;
  gameStateMock = {fieldState: {somestate: 'blah'}, gameState: {id: '1'}, gameSettings: {somesettings: 'blahblah'}};
  updatedGameId = '123';
  props: IProps = {
    saveGame: jest.fn(),
    loadGame: jest.fn(),
    startNewGame: jest.fn(),
    gameId: undefined,
    history: {replace: jest.fn()} as any,
    location: {pathname: 'my/super/path'} as any,
    match: {params: {}} as any
  };
  given = {
    gameIdExists: (): this => {
      this.props.gameId = '1';
      return this;
    },

    gameStateInitialized: (): this => {
      (store.getState as jest.Mock).mockImplementation(() => this.gameStateMock);
      return this;
    },

    gameIdUrlParamExists: (): this => {
      this.props.match.params.id = '1';
      return this;
    }
  };
  when = {
    render: (): this => {
      this.wrapper = shallow(<GameContainer {...this.props}/>);
      return this;
    },

    storeActionFired: (): this => {
      this.triggerStoreSubscribe();
      return this;
    },

    gameIdUpdated: (): this => {
      this.wrapper.setProps({gameId: this.updatedGameId});
      return this;
    }
  };
  get = {
    renderedContent: () => this.wrapper.getElement(),
    saveGameMock: () => this.props.saveGame,
    saveToLocalStorageMock: () => this.saveToLocalStorageMock,
    gameToSaveMock: () => {
      const {fieldState, gameState, gameSettings} = this.gameStateMock;
      return {field: fieldState, game: gameState, settings: gameSettings};
    },
    gameIdMock: () => {
      const {gameState: {id}} = this.gameStateMock;
      return id;
    },
    loadGameMock: () => this.props.loadGame,
    gameIdParam: () => this.props.match.params.id,
    historyReplaceMock: () => this.props.history.replace,
    locationPathMock: () => this.props.location.pathname,
    updatedGameId: () => this.updatedGameId,
    connectArgs: () => ConnectedGameContainer
  };

  constructor() {
    (saveToLocalStorage as jest.Mock).mockImplementation(this.saveToLocalStorageMock);
    (store.subscribe as jest.Mock).mockImplementation(s => {
      this.storeSubscriber = s;
      this.triggerStoreSubscribe = () => this.storeSubscriber();
    });
  }

}

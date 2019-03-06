import React from 'react';
import {GameContainerDriver} from './Game.container.driver';
import {GameComponent} from './Game.component';
import {ELocalStorageKeys} from '../utils/local-storage.utils';
import {GameContainer, mapStateToProps} from './Game.container';
import {loadGame, saveGame, startNewGame} from '../store/thunks/meta-game.thunks';

describe('Game container test', () => {
  let driver: GameContainerDriver;
  beforeEach(() => {
    driver = new GameContainerDriver();
  });

  it('Should render null when no gameId', () => {
    driver.when.render();
    expect(driver.get.renderedContent()).toBeNull();
  });

  it('Should render game component when there is gameId', () => {
    driver.given.gameIdExists().when.render();
    expect(driver.get.renderedContent()).toEqual(<GameComponent saveGame={driver.get.saveGameMock()}/>);
  });

  it('Should save game state to local storage on each store update', () => {
    driver.given.gameStateInitialized().when.render().when.storeActionFired();
    expect(driver.get.saveToLocalStorageMock()).toHaveBeenCalledWith(driver.get.gameToSaveMock(), ELocalStorageKeys.LAST_GAME);
  });

  it('Should save game id to local storage on each store update', () => {
    driver.given.gameStateInitialized().when.render().when.storeActionFired();
    expect(driver.get.saveToLocalStorageMock()).toHaveBeenCalledWith(driver.get.gameIdMock(), ELocalStorageKeys.LAST_GAME_ID);
  });

  it('Should load a game if received a game id as URL param', () => {
    driver.given.gameIdUrlParamExists().when.render();
    expect(driver.get.loadGameMock()).toHaveBeenCalledWith(driver.get.gameIdParam());
  });

  it(`Should put gameId on URL on props update if it wasn't there before`, () => {
    driver.when.render().when.gameIdUpdated();
    expect(driver.get.historyReplaceMock()).toHaveBeenCalledWith(`${driver.get.locationPathMock()}/${driver.get.updatedGameId()}`)
  });

  //Too much I think, it's like duplicate implementation
  it('Should connect GameContainer component to Redux', () => {
    expect(driver.get.connectArgs()).toEqual({mstp: mapStateToProps, mdtp: {saveGame, loadGame, startNewGame}, comp: GameContainer});
  })
});
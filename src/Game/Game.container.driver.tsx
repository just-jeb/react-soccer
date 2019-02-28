import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {GameContainer, IProps} from './Game.container';

const anyMock: any = jest.fn();

export class GameContainerDriver {
  wrapper!: ShallowWrapper;
  props: IProps = {
    saveGame: jest.fn(),
    loadGame: jest.fn(),
    startNewGame: jest.fn(),
    gameId: undefined,
    history: jest.fn() as any,
    location: jest.fn() as any,
    match: {params: jest.fn()} as any
  }

  given = {
    gameIdExists: (): this => {
      this.props.gameId = '1';
      return this;
    }
  }

  when = {
    render: (): this => {
      const {saveGame, loadGame, startNewGame, gameId, match, history, location} = this.props;
      this.wrapper = shallow(<GameContainer
        saveGame={saveGame}
        loadGame={loadGame}
        startNewGame={startNewGame}
        gameId={gameId}
        match={match}
        location={location}
        history={history}
      />);
      return this;
    }
  };

  get = {
    renderedContent: () => this.wrapper.getElement()
  }
}
import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {GameComponent} from './Game.component';
import {byDataHook} from '../../test/utils/selector.utils';

export class GameComponentDriver {
  wrapper!: ShallowWrapper;
  readonly props = {
    saveGame: jest.fn()
  };

  when = {
    render: (): this => {
      this.wrapper = shallow(<GameComponent saveGame={this.props.saveGame}/>);
      return this;
    },

    clickOnSave: (): this => {
      this.get.onSave().simulate('click');
      return this;
    }
  };

  get = {
    onSave: () => byDataHook(this.wrapper, 'save'),
    saveClickSpy: () => this.props.saveGame
  };
}
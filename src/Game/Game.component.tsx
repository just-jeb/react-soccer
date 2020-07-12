import React from 'react';
import FieldContainer from '../Field/Field.container';

interface IProps {
  saveGame: () => void;
}

export const GameComponent = ({ saveGame }: IProps) => (
  <>
    <FieldContainer />
    <button data-hook="save" onClick={saveGame}>
      Save
    </button>
  </>
);

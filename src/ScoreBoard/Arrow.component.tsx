import React from 'react';
import { CELL_SIZE } from '../constants';

export interface IArrowProps {
  flip: boolean;
  color: string | undefined;
  x: number;
}

const ARROW_LENGTH = CELL_SIZE * 2.5;
const POINTER_LENGTH = CELL_SIZE * 0.5;

export const Arrow = React.memo<IArrowProps>(({ flip, color, x }) => {
  const reverse = flip ? 'scale(-1,1)' : '';
  return (
    <path
      transform={`translate(${x}, 0) ${reverse}`}
      d={`
      M0,-4
      L0,4
      L${ARROW_LENGTH},4
      L${ARROW_LENGTH},20
      L${ARROW_LENGTH + POINTER_LENGTH},0
      L${ARROW_LENGTH},-20
      L${ARROW_LENGTH},-4
      L0,-4
      Z`}
      fill={color}
      fillRule="nonzero"
    />
  );
});

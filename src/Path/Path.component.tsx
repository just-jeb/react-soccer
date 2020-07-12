import React from 'react';
import { TConnectionCoords } from '../types/field.types';
import { CELL_SIZE } from '../constants';

interface PathComponentProps {
  pathCoords: TConnectionCoords[];
}

export const PathComponent = React.memo<PathComponentProps>(
  ({ pathCoords }) => {
    //Ignore all p2 for now except for the last one as the next point should start with that
    const points = pathCoords
      .map(([{ x: x1, y: y1 }, { x: x2, y: y2 }], index) =>
        index === pathCoords.length - 1
          ? `${x1 * CELL_SIZE} ${y1 * CELL_SIZE}, ${x2 * CELL_SIZE} ${
              y2 * CELL_SIZE
            }`
          : `${x1 * CELL_SIZE} ${y1 * CELL_SIZE}`,
      )
      .join(', ');
    return (
      <polyline
        points={points}
        fill={'none'}
        stroke={'#B6C1CD'}
        strokeWidth={7}
      />
    );
  },
);

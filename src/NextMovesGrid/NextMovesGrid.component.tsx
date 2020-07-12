import React from 'react';
import { INode } from '../types/field.types';
import { CELL_SIZE } from '../constants';

const CIRCLE_RADIUS = CELL_SIZE / 5;

interface NextMovesGridProps {
  nextMoves: INode[];
  hintColor: string | undefined;
  makeMove: (id: string) => void;
}

export const NextMovesGridComponent = React.memo<NextMovesGridProps>(
  ({ nextMoves, makeMove, hintColor }) => {
    return (
      <>
        {nextMoves.map(({ coordinates: { x, y }, id }) => (
          <g
            key={id}
            transform={`translate(${(x - 0.5) * CELL_SIZE}, ${
              (y - 0.5) * CELL_SIZE
            })`}
            onClick={() => makeMove(id)}
          >
            <circle
              cx={50}
              cy={50}
              r={CIRCLE_RADIUS}
              stroke={hintColor}
              strokeWidth={7}
              fillOpacity={0}
            >
              <animate
                attributeName="r"
                begin="0s"
                dur="1s"
                repeatCount="indefinite"
                from={CIRCLE_RADIUS}
                to={CIRCLE_RADIUS}
                values="7; 8; 9; 10; 9; 8; 7"
                keyTimes={'0; 0.1; 0.3; 0.5; 0.7; 0.9; 1'}
              />
            </circle>
            <rect
              cx={0}
              cy={0}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fillOpacity={0}
              strokeOpacity={0}
            />
          </g>
        ))}
      </>
    );
  },
);

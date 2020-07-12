import React from 'react';
import { INode } from '../types/field.types';
import { CELL_SIZE } from '../constants';

interface GateComponentProps {
  goalNodes: INode[];
  goalColor: string;
}

const buildGoalPath = (goalNodes: INode[]) => {
  const sorted = goalNodes.sort(
    ({ coordinates: { y: y1 } }, { coordinates: { y: y2 } }) => y1 - y2,
  );
  const x = sorted[0].coordinates.x;
  const bottomY = sorted[sorted.length - 1].coordinates.y;
  const topY = sorted[0].coordinates.y;
  const factor = x === 0 ? -1 : 1;
  const s = (n: number) => n * CELL_SIZE; //Scale
  const f = (n: number) => s(n) * factor; //Scale and direction
  return `
  M${f(x)},${s(topY)}
  H${f(x + 0.4)}
  C${f(x + 0.45)},${s(topY)}
   ${f(x + 0.5)},${s(topY + 0.05)}
   ${f(x + 0.5)},${s(topY + 0.1)}
  V${s(bottomY - 0.1)}
  C${f(x + 0.5)},${s(bottomY - 0.05)}
   ${f(x + 0.45)},${s(bottomY)}
   ${f(x + 0.4)},${s(bottomY)}
  H${f(x)}
  V${s(topY)}
  Z
  `;
};

export const GoalComponent = React.memo<GateComponentProps>(
  ({ goalNodes, goalColor }) => {
    return (
      <g>
        <path
          d={buildGoalPath(goalNodes)}
          id="GOAL-R"
          stroke="#FFFFFF"
          strokeWidth="7"
          fillOpacity="0.5"
          fill="#FFFFFF"
        />
        {goalNodes.map(({ coordinates: { x, y }, id }) => (
          <circle
            key={id}
            cx={x * CELL_SIZE}
            cy={y * CELL_SIZE}
            r={15}
            fill={goalColor}
          />
        ))}
      </g>
    );
  },
);

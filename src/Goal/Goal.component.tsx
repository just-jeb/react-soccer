import React from 'react';
import {INode} from "../types/field.types";

interface GateComponentProps {
  goalNodes: INode[];
  goalColor: string;
}

export const GoalComponent = React.memo<GateComponentProps>(({goalNodes, goalColor}) => {
  return (
    <g>
      {goalNodes.map(({coordinates: {x, y}, id}) =>
        <circle key={id} cx={x} cy={y} r={0.15} fill={goalColor}/>
      )}
    </g>
  )
});
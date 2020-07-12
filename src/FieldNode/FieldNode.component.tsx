import React from 'react';
import { INode } from '../types/field.types';
import { CELL_SIZE } from '../constants';

export interface IFieldNodeProps {
  node: INode;
  radius: number;
  color: string;
}

export const FieldNodeComponent = React.memo<IFieldNodeProps>(
  ({
    node: {
      coordinates: { x, y },
    },
    color,
    radius,
  }) => {
    return (
      <circle cx={x * CELL_SIZE} cy={y * CELL_SIZE} r={radius} fill={color} />
    );
  },
);

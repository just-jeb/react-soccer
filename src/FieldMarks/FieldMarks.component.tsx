import React from 'react';
import { IDimensions } from '../types';
import { CELL_SIZE } from '../constants';

interface IFieldMarksProps {
  fieldSize: IDimensions;
}

const GOAL_AREA_SIZE: IDimensions = {
  width: CELL_SIZE * 2,
  height: CELL_SIZE * 4,
};

const PENALTY_ARC_SIZE: IDimensions = {
  width: CELL_SIZE * 0.75,
  height: CELL_SIZE * 2,
};

const Corner = ({ transform }: { transform?: string }) => (
  <path
    transform={transform}
    d={`M${CELL_SIZE / 2},0
        Q${CELL_SIZE / 2.2},${CELL_SIZE / 2.2}
        0,${CELL_SIZE / 2}`}
  />
);

const HalfField = ({ fieldSize: { width, height } }: IFieldMarksProps) => {
  const midY = (height / 2) * CELL_SIZE;

  return (
    <>
      <path
        id="penalty-arc"
        transform={`translate(${GOAL_AREA_SIZE.width},${midY})`}
        d={`M0,${-PENALTY_ARC_SIZE.height / 2}
        C${PENALTY_ARC_SIZE.width * 1.1},${-PENALTY_ARC_SIZE.height / 4}
        ${PENALTY_ARC_SIZE.width * 1.1},${PENALTY_ARC_SIZE.height / 4}
        0,${PENALTY_ARC_SIZE.height / 2}`}
      />
      <Corner />
      <Corner transform={`translate(0, ${height * CELL_SIZE}) rotate(-90)`} />
      <rect
        id="goal-area"
        x="0"
        y={midY - GOAL_AREA_SIZE.height / 2}
        width={GOAL_AREA_SIZE.width}
        height={GOAL_AREA_SIZE.height}
      />
      <rect
        id="Field"
        x="0"
        y="0"
        width={width * CELL_SIZE}
        height={height * CELL_SIZE}
      />
    </>
  );
};

export class FieldMarksComponent extends React.PureComponent<IFieldMarksProps> {
  render() {
    const { fieldSize } = this.props;
    const midX = (fieldSize.width / 2) * CELL_SIZE;
    const midY = (fieldSize.height / 2) * CELL_SIZE;
    return (
      <g id="Marks" stroke="#FFFFFF" strokeWidth="7" fillOpacity="0">
        <HalfField fieldSize={fieldSize} />
        <g
          transform={`translate(${fieldSize.width * CELL_SIZE},0) scale(-1,1)`}
        >
          <HalfField fieldSize={fieldSize} />
        </g>
        <line x1={midX} y1={0} x2={midX} y2={fieldSize.height * CELL_SIZE} />
        <circle id="Center-Circle={true}" cx={midX} cy={midY} r={CELL_SIZE} />
      </g>
    );
  }
}

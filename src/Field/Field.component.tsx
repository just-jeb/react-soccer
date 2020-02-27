import React from 'react';
import styles from './Field.module.scss';
import { IDimensions } from '../types';
import PathContainer from '../Path/Path.container';
import NextMovesGrid from '../NextMovesGrid/NextMovesGrid.container';
import BallContainer from '../Ball/Ball.container';
import GoalsContainer from '../Goals/Goals.container';
import FieldNodes from '../FieldNodes/FieldNodes.container';

export interface IFieldProps {
  fieldSize: IDimensions;
  bordersColor: string;
}

export class FieldComponent extends React.PureComponent<IFieldProps> {
  render() {
    return this.buildSvg();
  }

  buildSvg() {
    const {
      fieldSize: { width, height },
      bordersColor,
    } = this.props;
    const middle = Math.floor(width / 2);
    //TODO: move SVG width and preserveAspectRation to CSS
    return (
      <div className={styles.field}>
        <svg
          width={700}
          viewBox={`0 0 ${width - 1} ${height - 1}`}
          preserveAspectRatio={'xMidYMid meet'}
        >
          <g stroke={`${bordersColor}`}>
            <rect
              width={width - 1}
              height={height - 1}
              fillOpacity={0}
              strokeWidth={0.1}
            />
            <line
              x1={middle}
              y1={0}
              x2={middle}
              y2={height - 1}
              strokeWidth={0.05}
            />
          </g>
          <PathContainer />
          <FieldNodes />
          <GoalsContainer />
          {<NextMovesGrid />}
          <BallContainer />
        </svg>
      </div>
    );
  }
}

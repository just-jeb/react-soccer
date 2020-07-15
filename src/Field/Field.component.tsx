import React from 'react';
import styles from './Field.module.scss';
import { IDimensions } from '../types';
import PathContainer from '../Path/Path.container';
import NextMovesGrid from '../NextMovesGrid/NextMovesGrid.container';
import BallContainer from '../Ball/Ball.container';
import GoalsContainer from '../Goals/Goals.container';
import FieldNodes from '../FieldNodes/FieldNodes.container';
import { CELL_SIZE } from '../constants';
import GrassContainer from '../Grass/Grass.container';
import FieldMarksContainer from '../FieldMarks/FieldMarks.container';
import ScoreContainer from '../ScoreBoard/ScoreBoard.container';

export interface IFieldProps {
  fieldSize: IDimensions;
}

export class FieldComponent extends React.PureComponent<IFieldProps> {
  render() {
    return this.buildSvg();
  }

  buildSvg() {
    const {
      fieldSize: { width, height },
    } = this.props;
    //TODO: move SVG width and preserveAspectRatio to CSS
    return (
      <div className={styles.field}>
        <svg
          width={1200}
          viewBox={`-100 -100 ${(width + 2) * CELL_SIZE} ${
            (height + 2) * CELL_SIZE
          }`}
          preserveAspectRatio={'xMidYMid meet'}
        >
          <GrassContainer />
          <FieldMarksContainer />
          <PathContainer />
          <FieldNodes />
          <GoalsContainer />
          <NextMovesGrid />
          <BallContainer />
          <ScoreContainer />
        </svg>
      </div>
    );
  }
}

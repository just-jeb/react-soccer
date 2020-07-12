import React from 'react';
import { IDimensions, IPoint } from '../types';
import { CELL_SIZE } from '../constants';

export interface IGrassProps {
  fieldSize: IDimensions;
}

export interface IGrassSectionProps {
  coordinates: IPoint;
  size: IDimensions;
}

class LightGrassSection extends React.PureComponent<IGrassSectionProps> {
  render() {
    const {
      coordinates: { x, y },
      size: { width, height },
    } = this.props;
    return (
      <rect
        fill={'#FFFFFF'}
        fillOpacity="0.1"
        x={x}
        y={y}
        width={width}
        height={height}
      />
    );
  }
}

const createLightGrassSections = ({ width, height }: IDimensions) => {
  const sections: IGrassSectionProps[] = [];
  for (let x = -0.5; x < width; x += 2) {
    sections.push({
      coordinates: { x: x * CELL_SIZE, y: -CELL_SIZE },
      size: { width: CELL_SIZE, height: (height + 1) * CELL_SIZE },
    });
  }
  return sections;
};

export class GrassComponent extends React.PureComponent<IGrassProps> {
  sections: IGrassSectionProps[];
  constructor(props: IGrassProps) {
    super(props);
    this.sections = createLightGrassSections(this.props.fieldSize);
  }

  render() {
    const {
      fieldSize: { width, height },
    } = this.props;
    return (
      <g id="Grass">
        <rect
          id="Dark-Grass"
          fill="#899C01"
          x={-CELL_SIZE}
          y={-CELL_SIZE}
          width={(width + 1) * CELL_SIZE}
          height={(height + 1) * CELL_SIZE}
        />
        {this.sections.map((section, i) => (
          <LightGrassSection {...section} key={i} />
        ))}
      </g>
    );
  }
}

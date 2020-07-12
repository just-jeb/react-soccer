import React from 'react';
import { IDimensions } from '../types';
import { CELL_SIZE } from '../constants';

interface IFieldMarksProps {
  fieldSize: IDimensions;
}

const HalfField = () => (
  <>
    <path
      d="M500,550 L500,600 L450,600 C450,572.661905 471.940286,550.448238 499.173159,550.006699 L500,550 Z"
      id="Bottom-Corner"
    />
    <path
      d="M450,0 L500,0 L500,50 C472.661905,50 450.448238,28.0597142 450.006699,0.826841425 L450,0 Z"
      id="Top-Corner"
    />
    <path
      d="M299.998942,198.429726 L299.998942,398.180274 C263.518324,379.769211 238.5,341.958777 238.5,298.305 C238.5,255.087761 263.020459,217.597582 298.907975,198.987865 L299.998942,198.429726 Z"
      id="Penalty-Arc"
    />
    <rect id="Goal-Area" x="300" y="100" width="200" height="400" />
    <rect id="Field" x="0" y="0" width="500" height="600" />
  </>
);

export class FieldMarksComponent extends React.PureComponent<IFieldMarksProps> {
  //The component is designed for viewPort 1000 * 600 so if the field size is different it should be scaled accordingly
  getScale = () => {
    const {
      fieldSize: { width, height },
    } = this.props;
    const y = ((height - 1) * CELL_SIZE) / 600;
    const x = ((width - 1) * CELL_SIZE) / 1000;
    return { x, y };
  };
  render() {
    const {
      fieldSize: { width, height },
    } = this.props;
    const { x, y } = this.getScale();
    const cx = Math.floor(width / 2) * 100;
    const cy = Math.floor(height / 2) * 100;
    return (
      <g id="Marks" stroke="#FFFFFF" strokeWidth="7" fillOpacity="0">
        <g transform={`scale(${x} ${y})`}>
          <g id="field-R" transform="translate(500.000000, 0.000000)">
            <HalfField />
          </g>
          <g
            id="field-L"
            transform="translate(250.000000, 300.000000) scale(-1, 1) translate(-250.000000, -300.000000) "
          >
            <HalfField />
          </g>
        </g>
        <circle id="Center-Circle" cx={cx} cy={cy} r={CELL_SIZE} />
      </g>
    );
  }
}

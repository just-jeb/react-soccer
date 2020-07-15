import React from 'react';
import { IPlayer, IPoint } from '../types';

export interface PlayerProps {
  flip?: boolean;
  player: IPlayer;
  coordinates: IPoint;
}

const AVATAR_RADIUS = 25;

export const Player = React.memo<PlayerProps>(
  ({ player: { color, name, attackDirection }, coordinates: { x, y } }) => {
    const [textAnchor, offset] =
      attackDirection === 'left'
        ? ['start', AVATAR_RADIUS]
        : ['end', -AVATAR_RADIUS];

    return (
      <g>
        <text
          id="Player-Two---Name"
          fontSize="37.5"
          fontWeight="bold"
          letterSpacing="-0.535714269"
          fill="#FFFFFF"
          x={x + offset * 1.5}
          y={y}
          alignmentBaseline={'central'}
          textAnchor={textAnchor}
        >
          {name}
        </text>
        <circle
          id="Player-Two---Avatar"
          fill={color}
          cx={x}
          cy={y}
          r={AVATAR_RADIUS}
        />
      </g>
    );
  },
);

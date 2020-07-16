import React from 'react';
import { IPlayer, IPoint } from '../types';

export interface PlayerProps {
  player: IPlayer;
  coordinates: IPoint;
  looser?: string | null;
}

const AVATAR_RADIUS = 25;

export const Player = React.memo<PlayerProps>(
  ({
    player: { color, name, attackDirection, id },
    coordinates: { x, y },
    looser,
  }) => {
    const isWinner = looser && looser !== id;
    const [textAnchor, offset, winnerAnchor] =
      attackDirection === 'left'
        ? ['start', AVATAR_RADIUS, 'end']
        : ['end', -AVATAR_RADIUS, 'start'];

    return (
      <g>
        <text
          id="player-name"
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
          id="player-avatar"
          fill={color}
          cx={x}
          cy={y}
          r={AVATAR_RADIUS}
        />
        {isWinner && (
          <text
            id="winner"
            fontSize="37.5"
            fontWeight="bold"
            letterSpacing="-0.535714269"
            fill={color}
            x={x - offset * 1.5}
            y={y}
            alignmentBaseline={'central'}
            textAnchor={winnerAnchor}
          >
            Winner
          </text>
        )}
      </g>
    );
  },
);

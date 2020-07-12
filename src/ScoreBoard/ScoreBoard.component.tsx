import React from 'react';
import { IPlayer } from '../types/game.types';
import { IPoint } from '../types';

interface ScoreBoardProps {
  currentPlayer: string;
  players: IPlayer[];
  looser?: string | null;
}
interface PlayerProps {
  flip?: boolean;
  player: IPlayer;
  coordinates: IPoint;
}

const Player = React.memo<PlayerProps>(
  ({ player: { color, name }, coordinates: { x, y }, flip }) => {
    const scale = flip ? 'scale(-1, 1)' : '';
    return (
      <g id="Player-Two" transform={`translate(${x}, ${y}) ${scale}`}>
        <text
          id="Player-Two---Name"
          fontSize="37.5"
          fontWeight="bold"
          letterSpacing="-0.535714269"
          fill="#FFFFFF"
        >
          <tspan x="350" y="39.5" rotate={'auto-reverse'}>
            {name}
          </tspan>
        </text>
        <circle id="Player-Two---Avatar" fill={color} cx="300" cy="25" r="25" />
      </g>
    );
  },
);

interface IArrowProps {
  left: boolean;
  color: string | undefined;
  x: number;
}

const Arrow = React.memo<IArrowProps>(({ left, color, x }) => {
  const reverse = left ? 'scale(-1,1)' : '';
  return (
    <path
      transform={`translate(${x}, 0) ${reverse}`}
      d="M40,4.5 L40,21.5 L304,21.5 L304,29 L40,29 L40,46 L-2,25.25 L40,4.5 Z"
      fill={color}
      fillRule="nonzero"
    />
  );
});

export const ScoreBoardComponent = React.memo<ScoreBoardProps>(
  ({ currentPlayer, players, looser }) => {
    const player = players.find(({ id }) => id === currentPlayer);
    const rightPlayer = player?.id === players[1].id;
    const arrowX = rightPlayer ? 264.5 : 464.5;
    return (
      <g id="Players" transform="translate(135.500000, 625.000000)">
        <Arrow left={!rightPlayer} color={player?.color} x={arrowX} />
        <Player
          player={players[0]}
          coordinates={{ x: 464.5, y: 0 }}
          flip={true}
        />
        <Player player={players[1]} coordinates={{ x: 264.5, y: 0 }} />
      </g>
    );
  },
);

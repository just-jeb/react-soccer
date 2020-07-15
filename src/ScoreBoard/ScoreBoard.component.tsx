import React from 'react';
import { IPlayer } from '../types/game.types';
import { CELL_SIZE } from '../constants';
import { Arrow } from './Arrow.component';
import { Player } from './Player.component';

interface ScoreBoardProps {
  currentPlayer: string;
  players: IPlayer[];
  looser?: string | null;
}

const LEFT_PLAYER_X = 0;
const RIGHT_PLAYER_X = CELL_SIZE * 4;

export const ScoreBoardComponent = React.memo<ScoreBoardProps>(
  ({ currentPlayer, players, looser }) => {
    const player = players.find(({ id }) => id === currentPlayer);
    const leftPlayer = player?.id === players[0].id;
    const arrowX = leftPlayer ? LEFT_PLAYER_X : RIGHT_PLAYER_X;
    return (
      <g
        id="Players"
        transform={`translate(${CELL_SIZE * 3}, ${CELL_SIZE * 6.5})`}
      >
        <Arrow flip={!leftPlayer} color={player?.color} x={arrowX} />
        <Player player={players[0]} coordinates={{ x: LEFT_PLAYER_X, y: 0 }} />
        <Player
          player={players[1]}
          coordinates={{ x: RIGHT_PLAYER_X, y: 0 }}
          flip={true}
        />
      </g>
    );
  },
);

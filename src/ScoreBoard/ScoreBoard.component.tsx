import React from 'react';
import { IPlayer } from '../types/game.types';
import { CELL_SIZE } from '../constants';
import { Arrow } from './Arrow.component';
import { Player } from './Player.component';
import { IDimensions } from '../types';

interface ScoreBoardProps {
  currentPlayer: IPlayer;
  players: IPlayer[];
  fieldSize: IDimensions;
  looser?: string | null;
}

const LEFT_PLAYER_X = 0;
const RIGHT_PLAYER_X = CELL_SIZE * 4;
const AVATARS_DISTANCE_IN_CELLS = 4;

export const ScoreBoardComponent = React.memo<ScoreBoardProps>(
  ({
    currentPlayer: { attackDirection, color },
    players,
    looser,
    fieldSize: { width, height },
  }) => {
    const isDirectionLeft = attackDirection === 'left';
    const arrowX = isDirectionLeft ? RIGHT_PLAYER_X : LEFT_PLAYER_X;
    const [scoreBoardX, scoreBoardY] = [
      ((width - 1 - AVATARS_DISTANCE_IN_CELLS) * CELL_SIZE) / 2,
      (height - 0.5) * CELL_SIZE,
    ];
    return (
      <g id="Players" transform={`translate(${scoreBoardX}, ${scoreBoardY})`}>
        <Arrow flip={isDirectionLeft} color={color} x={arrowX} />
        <Player player={players[0]} coordinates={{ x: LEFT_PLAYER_X, y: 0 }} />
        <Player player={players[1]} coordinates={{ x: RIGHT_PLAYER_X, y: 0 }} />
      </g>
    );
  },
);

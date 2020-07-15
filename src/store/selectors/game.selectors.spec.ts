import { IState } from '../state';
import {
  createFieldBoosters,
  createGoals,
  createNodes,
} from '../../utils/game.utils';
import { IDimensions } from '../../types';
import { EGameStatus, IPlayer } from '../../types';
import { reduceToDictionary } from '../../utils/common.utils';
import { possibleMovesSelector } from './field.selectors';

describe('Possible moves selector tests', () => {
  let mockState: IState;

  beforeEach(() => {
    const size: IDimensions = { width: 8, height: 4 };
    const nodes = createNodes(size);
    const players: IPlayer[] = [
      { color: 'black', id: '1', name: 'tester1', attackDirection: 'right' },
      { color: 'white', id: '2', name: 'tester2', attackDirection: 'left' },
    ];
    const gates = createGoals(size, nodes, players);
    const boosters = createFieldBoosters(size, nodes, gates);
    mockState = {
      gameState: {
        id: '',
        players,
        currentPlayer: 'tester1',
        gameStatus: EGameStatus.Playing,
      },
      fieldState: {
        nodes: reduceToDictionary(nodes, 'id'),
        boosters,
        goals: gates,
        path: [],
        ballNode: `${size.width / 2},${size.height / 2}`,
      },
      gameSettings: {
        fieldSize: { width: 7, height: 5 },
      },
      metaInfo: {
        savedGames: {},
      },
    };
  });

  it('Should provide a possible move to an adjacent edge when in corner', () => {
    const nextMovesXEdge = possibleMovesSelector({
      ...mockState,
      fieldState: { ...mockState.fieldState, ballNode: '0,1' },
    });
    expect(nextMovesXEdge).toContainEqual(
      expect.objectContaining({ coordinates: { x: 1, y: 0 } }),
    );

    const nextMovesYEdge = possibleMovesSelector({
      ...mockState,
      fieldState: { ...mockState.fieldState, ballNode: '1,0' },
    });
    expect(nextMovesYEdge).toContainEqual(
      expect.objectContaining({ coordinates: { x: 0, y: 1 } }),
    );
  });

  it('Should return no possible moves when the state is not Playing', () => {
    const nextMoves = possibleMovesSelector({
      ...mockState,
      gameState: { ...mockState.gameState, gameStatus: EGameStatus.End },
    });
    expect(nextMoves).toEqual([]);
  });
});

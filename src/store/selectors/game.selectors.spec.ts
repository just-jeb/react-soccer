import {IState} from "../state";
import {createFieldBoosters, createGates, createNodes} from "../../utils/game.utils";
import {IDimensions} from "../../types/common.types";
import {EGameStatus, IPlayer} from "../../types/game.types";
import {reduceToDictionary} from "../../utils/common.utils";
import {possibleMovesSelector} from "./game.selectors";

describe('Possible moves selector tests', () => {
    let mockState: IState;

    beforeEach(() => {
        const size: IDimensions = {width: 9, height: 5};
        const nodes = createNodes(size);
        const players: IPlayer[] = [
            {color: 'black', id: '1', name: 'tester1'},
            {color: 'white', id: '2', name: 'tester2'}
        ];
        const gates = createGates(size, nodes, players);
        const boosters = createFieldBoosters(size, nodes, gates);
        mockState = {
            gameState: {
                players,
                currentPlayer: 'tester1',
                gameStatus: EGameStatus.Playing,
                boosters,
                gates: reduceToDictionary(gates, 'owner'),
                path: [], ballNode: `${Math.floor(size.width / 2)},${Math.floor(size.height / 2)}`
            },
            fieldState: {nodes: reduceToDictionary(nodes, 'id')},
            gameSettings: {
                fieldSize: {width: 7, height: 5}
            }
        }
    });

    it('Should provide a possible move to an adjacent edge when in corner', () => {
        const nextMovesXEdge = possibleMovesSelector({
            ...mockState,
            gameState: {...mockState.gameState, ballNode: '0,1'}
        });
        expect(nextMovesXEdge).toContainEqual(expect.objectContaining({coordinates: {x: 1, y: 0}}));

        const nextMovesYEdge = possibleMovesSelector({
            ...mockState,
            gameState: {...mockState.gameState, ballNode: '1,0'}
        });
        expect(nextMovesYEdge).toContainEqual(expect.objectContaining({coordinates: {x: 0, y: 1}}));
    })
});
import {IState} from "../state";
import {createSelector} from "reselect";
import {TConnectionCoords} from "../../types/game.types";
import {nodesSelector} from "./field.selectors";
import {gameSettingsSelector} from "./settings.selector";
import {getNeighbors, isEdge, isMiddle} from "../../utils/field.utils";
import {nodesConnected} from "../../utils/game.utils";

export const gameStateSelector = (state: IState) => state.gameState;
export const gatesSelector = (state: IState) => gameStateSelector(state).gates;
export const gameStatusSelector = (state: IState) => gameStateSelector(state).gameStatus;
export const ballNodeSelector = (state: IState) => gameStateSelector(state).ballNode;
export const ballPositionSelector = createSelector(
    ballNodeSelector,
    nodesSelector,
    (ballNodeId, nodes) => nodes[ballNodeId].coordinates
);
export const currentPlayerSelector = (state: IState) => gameStateSelector(state).currentPlayer;

export const playersSelector = (state: IState) => gameStateSelector(state).players;

export const currentPlayerColorSelector = createSelector(
    currentPlayerSelector,
    playersSelector,
    (currentPlayer, players) => {
        const player = players.find(p => p.id === currentPlayer);
        return player && player.color;
    }
);

export const boostersSelector = (state: IState) => gameStateSelector(state).boosters;

export const boosterSelector = (state: IState, props: { id: string }) => boostersSelector(state)[props.id];

export const pathSelector = (state: IState) => gameStateSelector(state).path;

export const gateNodesSelector = createSelector(
    gatesSelector,
    nodesSelector,
    (gates, nodes) => (player: string) => gates[player].nodes.map(id => nodes[id])
);

//We use createSelector here because there is a data transformation that we want to memoize

export const pathCoordinatesSelector = createSelector(
    nodesSelector,
    pathSelector,
    (nodes, path) => path.reduce<TConnectionCoords[]>((coordPairs, [id1, id2]) => {
        coordPairs.push([nodes[id1].coordinates, nodes[id2].coordinates]);
        return coordPairs;
    }, [])
);

export const possibleMovesSelector = createSelector(
    gameSettingsSelector,
    ballNodeSelector,
    nodesSelector,
    pathSelector,
    ({fieldSize}, ballNodeId, nodes, path) => {
        const ballNode = nodes[ballNodeId];
        const neighbors = getNeighbors(ballNode.coordinates, fieldSize);

        let possibleMoves = Object.values(nodes)
            .filter(({coordinates: {x, y}}) =>
                neighbors.some(({x: nx, y: ny}) => x === nx && y === ny))
            .filter(node => !nodesConnected(node, ballNode, path));

        const mutualExclusionPredicates = [isEdge(fieldSize), isMiddle(fieldSize)];
        for (const predicate of mutualExclusionPredicates) {
            if (predicate(ballNode.coordinates)) {
                possibleMoves = possibleMoves.filter(({coordinates}) => !predicate(coordinates))
            }
        }
        return possibleMoves;
    }
);
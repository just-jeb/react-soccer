import {IState} from "../state";
import {createSelector, defaultMemoize as memoize} from "reselect";
import {EGameStatus, TConnectionCoords} from "../../types/game.types";
import {nodesSelector} from "./field.selectors";
import {gameSettingsSelector} from "./settings.selector";
import {getNeighbors, isMiddle, isXEdge, isYEdge} from "../../utils/field.utils";
import {nodesConnected} from "../../utils/game.utils";
import {IPoint} from "../../types/common.types";

export const gameStateSelector = (state: IState) => state.gameState;
///////////////////////////////////////////////////////////////////

//TODO: Consider moving into reducer file
//export const goalSelector = (state: IState) => gameReducer.getGoals(state.gameState)


export const goalsSelector = (state: IState) => gameStateSelector(state).goals;
export const gameStatusSelector = (state: IState) => gameStateSelector(state).gameStatus;
export const gameIdSelector = (state: IState) => gameStateSelector(state).id;
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
        return (player && player.color) || 'black';
    }
);

export const nodesByIdsSelector = createSelector(
    nodesSelector,
    (nodes) => memoize((nodesIds: string[]) => nodesIds.map(id => nodes[id]))
);

export const playerColorSelector = createSelector(
    playersSelector,
    players => memoize((playerId: string) => {
        const player = players.find(p => p.id === playerId);
        return (player && player.color) || 'black'
    })
);

export const boostersSelector = (state: IState) => gameStateSelector(state).boosters;

export const boosterSelector = (state: IState, props: { id: string }) => boostersSelector(state)[props.id];

export const pathSelector = (state: IState) => gameStateSelector(state).path;


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
    gameStatusSelector,
    ({fieldSize}, ballNodeId, nodes, path, status) => {
        if (status !== EGameStatus.Playing) {
            return [];
        }
        const ballNode = nodes[ballNodeId];
        const {coordinates} = ballNode;
        const {x: bx, y: by} = coordinates;
        const neighbors = getNeighbors(coordinates, fieldSize);

        let possibleMoves = Object.values(nodes)
            .filter(({coordinates: {x, y}}) =>
                neighbors.some(({x: nx, y: ny}) => x === nx && y === ny))
            .filter(node => !nodesConnected(node, ballNode, path));

        const isSameEdge = ({x, y}: IPoint) => (isXEdge(fieldSize)(coordinates) && bx === x)
            || (isYEdge(fieldSize)(coordinates) && by === y);

        const mutualExclusionPredicates = [isSameEdge, isMiddle(fieldSize)];
        for (const predicate of mutualExclusionPredicates) {
            if (predicate(coordinates)) {
                possibleMoves = possibleMoves.filter(({coordinates: coords}) => !predicate(coords))
            }
        }
        return possibleMoves;
    }
);
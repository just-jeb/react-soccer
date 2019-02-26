import {IState} from "../state";
import {createSelector, defaultMemoize as memoize} from "reselect";
import {TConnectionCoords} from "../../types/field.types";
import {getBallNode, getBoosters, getGoals, getNodes, getPath} from "../reducers/field.reducer";
import {gameSettingsSelector} from "./settings.selector";
import {EGameStatus} from "../../types/game.types";
import {getNeighbors, isMiddle, isXEdge, isYEdge} from "../../utils/field.utils";
import {nodesConnected} from "../../utils/game.utils";
import {IPoint} from "../../types/common.types";
import {gameStatusSelector} from "./game.selectors";

export const nodesSelector = ({fieldState}: IState) => getNodes(fieldState);

export const nodesListSelector = createSelector(
  nodesSelector,
  nodes => Object.values(nodes)
);
export const goalsSelector = (state: IState) => getGoals(state.fieldState);
export const ballNodeSelector = (state: IState) => getBallNode(state.fieldState);
export const ballPositionSelector = createSelector(
  ballNodeSelector,
  nodesSelector,
  (ballNodeId, nodes) => nodes[ballNodeId].coordinates
);
export const nodesByIdsSelector = createSelector(
  nodesSelector,
  (nodes) => memoize((nodesIds: string[]) => nodesIds.map(id => nodes[id]))
);
export const boostersSelector = (state: IState) => getBoosters(state.fieldState);
export const pathSelector = (state: IState) => getPath(state.fieldState);
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
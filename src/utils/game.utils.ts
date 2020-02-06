import { IPlayer } from "../types/game.types";
import { IGoal, INode, TBoosters, TConnection } from "../types/field.types";
import { IDimensions } from "../types/common.types";
import { stringifyPoint } from "./common.utils";
import { isEdge, isMiddle } from "./field.utils";

export const nodesConnected = (node1: INode, node2: INode, path: TConnection[]) => {
  return path.some(([id1, id2]) => (id1 === node1.id && id2 === node2.id)
    || (id1 === node2.id && id2 === node1.id))
};

// TODO: use type of updateGameState action payload instead of newBallNode and string
export const determineNextPlayer = (boosters: TBoosters, currentPlayer: string, players: IPlayer[], newBallNode: string): string => {
  if (!boosters[newBallNode]) {
    const i = players.findIndex(p => p.id === currentPlayer);
    const nextIndex = (i + 1) % players.length;
    return players[nextIndex].id;
  } else {
    return currentPlayer;
  }
};

export const determineLooser = (goals: IGoal[], nextMoves: INode[], ballNode: string, currentPlayer: string): string | null => {
  const capturedGoal = Object.values(goals).find(g => g.nodes.includes(ballNode));
  if (capturedGoal) {
    return capturedGoal.owner;
  } else if (nextMoves.length === 0) {
    return currentPlayer;
  }
  return null;
};

export const createNodes = ({ width, height }: IDimensions): INode[] => {
  return Array(width * height).fill(null).map((node, index) => {
    const coordinates = { x: (index % width), y: Math.floor(index / width) };
    const id = stringifyPoint(coordinates);
    return {
      id,
      coordinates
    }
  });
};

export const createGoals = ({ width, height }: IDimensions, nodes: INode[], [p1, p2]: IPlayer[]): IGoal[] => {
  const midY = Math.floor(height / 2);
  const gatesYCoord = [midY - 1, midY, midY + 1];
  const mapGatesYCoordsToNodes = (transformFunction: (y: number) => number) =>
    gatesYCoord.map(transformFunction).map(i => nodes[i].id);

  return [
    {
      owner: p1.id,
      nodes: mapGatesYCoordsToNodes(y => y * width)
    },
    {
      owner: p2.id,
      nodes: mapGatesYCoordsToNodes(y => (y + 1) * width - 1)
    }
  ];
};

export const createFieldBoosters = (fieldSize: IDimensions, nodes: INode[], gates: IGoal[]): TBoosters => {
  return nodes.reduce<TBoosters>((boosters, node) => {
    const isBooster = !gates.some(g => g.nodes.includes(node.id)) &&
      (isEdge(fieldSize)(node.coordinates) || isMiddle(fieldSize)(node.coordinates));
    return { ...boosters, [node.id]: isBooster };
  }, {});
};
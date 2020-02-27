import { IPoint } from './common.types';

export interface IField {
  readonly nodes: { [id: string]: INode };
  readonly ballNode: string;
  //Path is an ordered array of node pairs that describes path on the field
  //For now it would be sufficient to have just array of nodeIds (not pairs) as path is sequential,
  //but later on we might need this info for drawing certain connections in different colors
  readonly path: TConnection[];
  readonly boosters: TBoosters;
  readonly goals: IGoal[];
}

export interface INode {
  id: string;
  coordinates: IPoint;
}

export interface IGoal {
  readonly nodes: string[];
  readonly owner: string;
}

export type TConnection = [string, string];
export type TBoosters = { readonly [nodeId: string]: boolean };
export type TConnectionCoords = [IPoint, IPoint];

import {IPoint} from "./common.types";

export interface Field {
    readonly nodesIds: string[];
    readonly nodes: { [id: string]: INode }
    //Path is an ordered array of node pairs that describes path on the field
    //For now it would be sufficient to have just array of nodeIds (not pairs) as path is sequential,
    //but later on we might need this info for drawing certain connections in different colors
    readonly path: Connection[];
}

export type Connection = [string, string];

export type ConnectionCoords = [IPoint, IPoint];

export interface INode {
    booster?: boolean;
    coordinates: IPoint;
}
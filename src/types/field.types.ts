import {IPoint, ISize} from "./common.types";

export interface Field {
    readonly nodesIds: string[];
    readonly nodes: { [id: string]: INode }
    readonly connections?: { node1: string, node2: string }[]
}

export interface INode {
    booster?: boolean;
    coordinates: IPoint;
}
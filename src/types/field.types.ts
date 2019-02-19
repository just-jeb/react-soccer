import {IPoint} from "./common.types";

export interface IField {
    readonly nodesIds: string[];
    readonly nodes: { [id: string]: INode }
}


export interface INode {
    coordinates: IPoint;
}
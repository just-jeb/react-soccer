import {INode} from "./INode";

export interface IField {
    readonly nodesIds: string[];
    readonly nodes: { [id: string]: INode }
    readonly connections: { node1: string, node2: string }[]
}
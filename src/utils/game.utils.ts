import {TConnection} from "../types/game.types";
import {INode} from "../types/field.types";

export const nodesConnected = (node1: INode, node2: INode, path: TConnection[]) => {
    return path.some(([id1, id2]) => (id1 === node1.id && id2 === node2.id)
        || (id1 === node2.id && id2 === node1.id))
};
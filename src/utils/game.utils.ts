import {INode} from "../types/field.types";
import {IPoint, ISize} from "../types/common.types";

export const getNodeId = ({coordinates: {x, y}}: INode) => `${x},${y}`;

export const isEdge = ({x, y}: IPoint, {width, height}: ISize) => {
    return x === 0 || y === 0 || x === width - 1 || y === height -1;
};

export const isMiddle = ({x}: IPoint, {width}: ISize) => {
    return x === Math.floor(width/2);
};
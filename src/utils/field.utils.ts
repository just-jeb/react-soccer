import {IDimensions, IPoint} from "../types/common.types";

export const isEdge = ( {width, height}: IDimensions) => ({x, y}: IPoint): boolean => {
    return x === 0 || y === 0 || x === width - 1 || y === height - 1;
};

export const isMiddle = ({width}: IDimensions) => ({x}: IPoint): boolean => {
    return x === Math.floor(width / 2);
};

export const withinRange = ({width, height}: IDimensions) => ({x, y}: IPoint): boolean => {
    return x >= 0 && x < width && y >= 0 && y < height;
};

const possibleNeighbors = [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [-1, 1], [1, -1]];

export const getNeighbors = ({x, y}: IPoint, d: IDimensions): IPoint[] => {
    const withinRangeFilter = withinRange(d);
    return possibleNeighbors.map(([x1, y1]) => ({x: x + x1, y: y + y1})).filter(withinRangeFilter);
};
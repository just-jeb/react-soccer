import {IPoint} from "../types/common.types";

export const initializeCoordinatesTransformer = (xScale: number, yScale: number) => {
    transformCoordinates = ({x, y}: IPoint) => {
        return {x: xScale*x + xScale/2, y: yScale*y + yScale/2};
    };
};

export let transformCoordinates: (p: IPoint) => IPoint;
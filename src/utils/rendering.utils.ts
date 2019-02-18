import {IPoint} from "../types/common.types";

export const initializeCoordinatesTransformer = (xScale: number, yScale: number) => {
    transformCoordinates = ({x, y}: IPoint) => {
        return {x: xScale*x, y: yScale*y};
    };
};

export let transformCoordinates: (p: IPoint) => IPoint;
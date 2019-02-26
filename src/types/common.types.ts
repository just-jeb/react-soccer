export interface IDimensions {
    width: number;
    height: number;
}

export interface IPoint {
    x: number;
    y: number;
}

export type Dictionary<T> = {[id: string]: T};
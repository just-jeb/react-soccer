import {IPoint} from "../types/common.types";

export const stringifyPoint = ({x, y}: IPoint) => `${x},${y}`;

type IndexType = number | string | Symbol;

type IndexablePropertyNames<T> = { [K in keyof T]: T[K] extends IndexType ? K : never }[keyof T];

export function reduceToDictionary<T extends {[a: number]: any}, K extends keyof T, E extends string>
(array: T[], index: IndexablePropertyNames<T>): {[key in E]: T};
export function reduceToDictionary<T extends {[a: number]: any}, K extends keyof T>
(array: T[], index: IndexablePropertyNames<T>): {[key: number]: T};
export function reduceToDictionary<T extends {[a: string]: any}, K extends keyof T>
(array: T[], index: IndexablePropertyNames<T>): {[key: number]: T};
export function reduceToDictionary<T extends {[a: number]: any}, K extends keyof T>
    (array: T[], index: IndexablePropertyNames<T>): {[key: string]: T}
export function reduceToDictionary<T extends {[a: string]: any}, K extends keyof T>
(array: T[], index: IndexablePropertyNames<T>): {[key: string]: T} {
    return array.reduce((acc, curr) => {
        return {...acc, [curr[index]]: curr}
    }, {})
}
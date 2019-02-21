import {IPoint} from "./common.types";

export interface IField {
    readonly nodes: { [id: string]: INode }
}


export interface INode {
    id: string;
    coordinates: IPoint;
}
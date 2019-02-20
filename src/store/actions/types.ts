import {ActionCreatorsMapObject} from "redux";
import {ThunkAction} from "redux-thunk";
import {IState} from "../state";
import {Action} from "./utils";

//Return types of our action creators
export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

//TODO: strengthen type definition
export type ReactSoccerThunkAction = ThunkAction<any, IState, any, Action<any>>;
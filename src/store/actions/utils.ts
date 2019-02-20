import {Action as ReduxAction} from 'redux';
export interface Action<T extends string> extends ReduxAction<T>{};

export interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T,P>;
export function createAction<T extends string, P>(type: T, payload?: P){
    return payload === undefined ? {type} : {type, payload}
}
import {combineReducers, createStore} from "redux";
import {IState} from "./state";
import {fieldState} from "../reducers/field.reducer";
import {settings} from "../reducers/settings.reducer";


export const store = createStore(combineReducers<IState>({fieldState, settings}));
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {IState} from "./state";
import {fieldState} from "../reducers/field.reducer";
import {gameSettings, renderingSettings} from "../reducers/settings.reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {gameState} from "../reducers/game.reducer";
import {Action, ActionWithPayload} from "../actions/utils";
import {EGameActionsTypes, GameActions} from "../actions/game.actions";
import {FieldActions, FieldActionsTypes} from "../actions/field.actions";
import {SettingsActions} from "../actions/settings.actions";

const composeEnhancers = composeWithDevTools({
    //TODO: Redux devtools options here
});


//TODO: try Redux Observables and compare with Thunks
export const store = createStore(combineReducers<IState>({
        fieldState,
        gameSettings,
        renderingSettings,
        gameState
    }),
    composeEnhancers(
        applyMiddleware<ThunkDispatch<IState, undefined, AnyAction>, IState>(thunk)
    )
);
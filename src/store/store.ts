import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {IState} from "./state";
import {fieldState} from "./reducers/field.reducer";
import {gameSettings} from "./reducers/settings.reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {gameState} from "./reducers/game.reducer";
import {metaInfo} from "./reducers/meta-game.reducer";

const composeEnhancers = composeWithDevTools({
    //TODO: Redux devtools options here
});


//TODO: try Redux Observables and compare with Thunks
export const store = createStore(combineReducers<IState>({
        fieldState,
        gameSettings,
        gameState,
        metaInfo
    }),
    composeEnhancers(
        applyMiddleware<ThunkDispatch<IState, undefined, AnyAction>, IState>(thunk)
    )
);
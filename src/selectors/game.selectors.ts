import {IState} from "../store/state";
import {createSelector} from "reselect";
import {TConnectionCoords} from "../types/game.types";
import {nodesSelector} from "./field.selectors";

export const gameStateSelector = (state: IState) => state.gameState;
export const gameStatusSelector = (state: IState) => gameStateSelector(state).gameStatus;
export const ballNodeSelector = (state: IState) => gameStateSelector(state).ballNode;
export const currentPlayerSelector = (state: IState) => gameStateSelector(state).currentPlayer;
export const boostersSelector = (state: IState) => gameStateSelector(state).boosters;

export const boosterSelector = (state: IState, props: {id: string}) => boostersSelector(state)[props.id];

export const pathSelector = (state: IState) => gameStateSelector(state).path;
//We use createSelector here because there is a data transformation that we want to memoize
export const pathCoordinatesSelector = createSelector(
    nodesSelector,
    pathSelector,
    (nodes, path) => path.reduce<TConnectionCoords[]>((coordPairs, [id1, id2]) => {
        coordPairs.push([nodes[id1].coordinates, nodes[id2].coordinates]);
        return coordPairs;
    }, [])
);
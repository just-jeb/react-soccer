import {IState} from "../store/state";
import {createSelector} from "reselect";
import {ConnectionCoords} from "../types/field.types";

export const fieldStateSelector = (state: IState) => state.fieldState;

//No need for createSelector here as there is nothing to memoize (no computed state, just simple dereference)
export const nodeIdsSelector = (state: IState) => fieldStateSelector(state).nodesIds;
export const nodesSelector = (state: IState) => fieldStateSelector(state).nodes;
export const nodeSelector = (state: IState, props: { id: string }) => nodesSelector(state)[props.id];

export const pathSelector = (state: IState) => fieldStateSelector(state).path;

//We use createSelector here because there is a data transformation that we want to memoize

export const pathCoordinatesSelector = createSelector(
    nodesSelector,
    pathSelector,
    (nodes, path) => path.reduce<ConnectionCoords[]>((coordPairs, [id1, id2]) => {
        coordPairs.push([nodes[id1].coordinates, nodes[id2].coordinates]);
        return coordPairs;
    }, [])
);
